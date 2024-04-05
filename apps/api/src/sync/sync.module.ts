import { Module } from '@nestjs/common';
import { SyncController } from './sync.controlller';
import { CollectorModule } from './collector/collector.module';
import { PublisherModule } from './publisher/publisher.module';
import { SyncService } from './sync.service';
import { BullModule } from '@nestjs/bull';
import { BankingModule } from 'src/banking/banking.module';

@Module({
  imports: [
    CollectorModule,
    PublisherModule,
    BankingModule,
    BullModule.registerQueue({
      name: 'sync.collector',
    }),
    BullModule.registerQueue({
      name: 'sync.publisher',
    }),
  ],
  providers: [SyncService],
  controllers: [SyncController],
})
export class SyncModule {}
