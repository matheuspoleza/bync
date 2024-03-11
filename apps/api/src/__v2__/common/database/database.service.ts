import { Global, Injectable, OnModuleInit } from '@nestjs/common';

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { ConfigService } from '@nestjs/config';

@Global()
@Injectable()
export class DatabaseService implements OnModuleInit {
  public client: SupabaseClient<Database>;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    this.client = createClient<Database>(
      this.configService.get<string>('SUPABASE_URL'),
      this.configService.get<string>('SUPABASE_ANON_KEY'),
    );
  }

  getClient(): SupabaseClient {
    return this.client;
  }
}
