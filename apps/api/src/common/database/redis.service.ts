import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { Redis } from '@upstash/redis';
import { ConfigService } from '@nestjs/config';

@Global()
@Injectable()
export class RedisService implements OnModuleInit {
  client!: Redis;

  constructor(private configService: ConfigService) {}

  async set<T = unknown>(key: string, value: T) {
    return await this.client.set(key, value);
  }

  async get<T = unknown>(key: string): Promise<T | null> {
    return await this.client.get(key);
  }

  onModuleInit() {
    this.client = new Redis({
      url: this.configService.get<string>('UPSTASH_REDIS_HOST', ''),
      token: this.configService.get<string>('UPSTASH_REDIS_TOKEN', ''),
    });
  }
}
