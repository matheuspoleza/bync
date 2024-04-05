import { NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Request, Response, NextFunction } from 'express';
import { Tables } from '../common/database';
import { API_KEY } from './auth.constants';

let customerUserIdMap: Record<string, string> = {};

export class AuthMiddleware implements NestMiddleware {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = new SupabaseClient(
      process.env.SUPABASE_URL || '',
      process.env.SUPABASE_ANON_KEY || '',
    );
  }

  async use(req: Request, _: Response, next: NextFunction) {
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

      if (!response.data.user) {
        throw new UnauthorizedException('User not found');
      }

      const userId = response.data.user.id;

      if (!userId) {
        throw new UnauthorizedException('Invalid token');
      }

      let customerId = customerUserIdMap[userId];

      if (!customerId) {
        const { data } = await this.supabase
          .schema('public')
          .from('identity_customers')
          .select('*')
          .eq('user_id', userId)
          .single();

        const customersData = data as Tables<'identity_customers'>;

        customerId = customersData.id;

        customerUserIdMap[userId] = customerId;
      }

      req.user = { userID: userId };
      req.customerId = customerId;

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
