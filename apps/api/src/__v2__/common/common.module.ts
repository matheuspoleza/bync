import { Module } from '@nestjs/common';
import { DatabaseService, RedisService } from './database';

@Module({
  providers: [DatabaseService, RedisService],
})
export class CommonModule {}
