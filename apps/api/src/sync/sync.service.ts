import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bull';
import {
  CollectDto,
  CollectResponse,
} from './collector/application/dtos/collect.dto';
import { PublishDto } from './publisher/application/dtos/publish.dto';
import { BankingFacade } from 'src/banking/banking.facade';
import { CollectorBankAccountAdapter } from './collector/domain/bank-account';

@Injectable()
export class SyncService {
  constructor(
    @InjectQueue('sync.collector')
    private readonly collectorJob: Queue<CollectDto>,
    @InjectQueue('sync.publisher')
    private readonly publisherJob: Queue<PublishDto>,
    private readonly bankingFacade: BankingFacade,
  ) {}

  async manualSync(customerId: string) {
    const bankAccounts = await this.bankingFacade.getAllLinkedAccounts(
      customerId,
      new CollectorBankAccountAdapter(),
    );

    await this.collectorJob.add({
      from: new Date(),
      to: new Date(),
      bankAccountIds: bankAccounts.map((b) => b.id),
    });

    this.collectorJob.once('completed', async (job: Job<CollectResponse>) => {
      await this.publisherJob.add({
        sessionId: job.data.session.id,
      });
    });
  }
}
