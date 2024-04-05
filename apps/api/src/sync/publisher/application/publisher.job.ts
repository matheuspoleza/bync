import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { PublishDto } from './dtos/publish.dto';
import { CollectorFacade } from 'src/sync/collector/collector.facade';

@Injectable()
@Processor('sync.publisher')
export class PublisherService {
  constructor(private readonly collectorFacade: CollectorFacade) {}

  @Process()
  async publish(job: Job<PublishDto>) {
    const { sessionId } = job.data;

    const session = await this.collectorFacade.getSession(sessionId);

    console.log(`Publishing session with id ${session.id}`);
  }
}
