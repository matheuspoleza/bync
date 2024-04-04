import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { QUEUE_NAMES } from 'src/app.constants';
import { CollectDto } from './collector/application/dtos/collect.dto';
import { OnEvent } from '@nestjs/event-emitter';
import { NewTransactionsCollectedEvent } from './collector/domain/new-transactions-collected.event';
import { CollectorFacade } from './collector/collector.facade';

@Injectable()
export class SyncService {
  constructor(@InjectQueue(QUEUE_NAMES.SYNC_COLLECTOR) private collectorJob: Queue<CollectDto>, private readonly collectorFacade: CollectorFacade) {}

  async manualSync() {
    await this.collectorJob.add({ from: new Date(), to: new Date() });
  }

  @OnEvent(NewTransactionsCollectedEvent.EVENT_NAME)
  async handleCollectorCompleted(event: NewTransactionsCollectedEvent) {
    const sessionData = await this.collectorFacade.getSessionData(event.sessionId);
  }
}
