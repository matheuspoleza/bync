import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import {
  CollectDto,
  CollectResponse,
} from './collector/application/dtos/collect.dto';
import { PublishDto } from './publisher/application/dtos/publish.dto';

@Injectable()
export class SyncService {
  constructor(
    @InjectQueue('sync.collector')
    private readonly collectorJob: Queue<CollectDto>,
    @InjectQueue('sync.publisher')
    private readonly publisherJob: Queue<PublishDto>,
  ) {}

  async manualSync() {
    await this.collectorJob.add({
      from: new Date(),
      to: new Date(),
      bankAccountIds: [],
    });

    this.collectorJob.once('completed', async (job: Job<CollectResponse>) => {
      await this.publisherJob.add({
        sessionId: job.data.session.id,
      });
    });
  }
}
