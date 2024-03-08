import { Global, Injectable, OnModuleInit } from '@nestjs/common';

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { ConfigService } from '@nestjs/config';

@Global()
@Injectable()
export class DatabaseService implements OnModuleInit {
  private client: SupabaseClient | null;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const supabase = createClient<Database>(
      this.configService.get<string>('SUPABASE_URL'),
      this.configService.get<string>('SUPABASE_ANON_KEY'),
    );

    this.client = supabase;
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}
