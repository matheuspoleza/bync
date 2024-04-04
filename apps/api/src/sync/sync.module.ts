import { Module } from '@nestjs/common';
import { SyncController } from './sync.controlller';
import { CollectorModule } from './collector/collector.module';
import { PublisherModule } from './publisher/publisher.module';

@Module({
  imports: [CollectorModule, PublisherModule],
  controllers: [SyncController],
})
export class SyncModule {}
