import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { DatabaseService } from '../common/database';
import { SignupRequest } from './dtos/signup.dto';
import { CustomerRepository } from 'src/identity/customer.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseClient: DatabaseService,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async validateUser(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
      const { data, error } = await this.supabaseClient.client.auth.getUser(
        decoded.sub,
      );

      if (error) throw error;

      return data;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async signup(data: SignupRequest) {
    const response = await this.supabaseClient.client.auth.signUp({
      email: data.email,
      password: data.password,
    });

    const createdSupabaseUser = response.data.user;

    if (!createdSupabaseUser) {
      console.error('Supabase user not created. Response:', response);
      throw new Error('Error creating user');
    }

    try {
      const customer = await this.customerRepository.createOne(
        createdSupabaseUser.id,
        data.fullName,
      );

      return {
        customerId: customer.id,
        userId: createdSupabaseUser.id,
      };
    } catch (e) {
      await this.supabaseClient.client.auth.admin.deleteUser(
        createdSupabaseUser.id,
      );

      throw new Error('Failed to signup');
    }
  }
}
