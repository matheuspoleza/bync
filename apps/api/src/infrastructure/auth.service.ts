import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { DatabaseService } from './database';

@Injectable()
export class AuthService {
  constructor(private supabaseClient: DatabaseService) {}

  async validateUser(token: string): Promise<any> {
    const client = this.supabaseClient.getClient();

    try {
      const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
      const { data, error } = await client.auth.getUser(decoded.sub);

      if (error) throw error;

      return data;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
