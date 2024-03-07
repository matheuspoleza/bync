import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Redis } from '@upstash/redis';
import { Request, Response, NextFunction } from 'express';
import { Tables } from 'src/infrastructure/database';

const API_KEY = '7df56b81-34e0-492d-a1c0-4a86fcf8fee9';

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
    const tokenType = req.headers.authorization?.split(' ')[0];
    const token = req.headers.authorization?.split(' ')[1];

    if (tokenType === 'API') {
      if (token === API_KEY) {
        return next();
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    }

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
          .from('customers')
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
