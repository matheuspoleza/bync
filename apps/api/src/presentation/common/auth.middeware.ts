import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Redis } from '@upstash/redis';
import { Request, Response, NextFunction } from 'express';
import { Tables } from 'src/infrastructure/database';
import { CustomerRepository } from 'src/infrastructure/repositories/customer.repository';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private redis: Redis;
  private supabase: SupabaseClient;

  constructor() {
    this.redis = new Redis({
      url: process.env.UPSTASH_REDIS_HOST,
      token: process.env.UPSTASH_REDIS_TOKEN,
    });
    this.supabase = new SupabaseClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
    );
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const response = await this.supabase.auth.getUser(token);
      const userID = response.data.user.id;

      if (!userID) {
        throw new UnauthorizedException('Invalid token');
      }

      let customerID: string;

      const cachedCustomerID = await this.redis.get<string>(
        `auth:user-customer-map:${userID}`,
      );

      if (!cachedCustomerID) {
        const { data } = await this.supabase
          .schema('public')
          .from(CustomerRepository.TABLE_NAME)
          .select('*')
          .eq('user_id', userID)
          .single();

        const customersData = data as Tables<'customers'>;

        await this.redis.setex(
          `auth:user-customer-map:${userID}`,
          86400,
          customersData.id,
        );

        customerID = customersData.id;
      } else {
        customerID = cachedCustomerID;
      }

      req.user = { userID };
      req.customerID = customerID;

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
