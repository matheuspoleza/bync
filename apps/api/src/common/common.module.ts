import { Module, Global } from '@nestjs/common';
import { DatabaseService, RedisService } from './database';

@Global()
@Module({
  providers: [DatabaseService, RedisService],
  exports: [DatabaseService, RedisService],
})
export class CommonModule {}
