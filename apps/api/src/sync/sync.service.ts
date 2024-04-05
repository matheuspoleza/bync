import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job, Queue } from 'bull';
import {
  CollectDto,
  CollectResponse,
} from './collector/application/dtos/collect.dto';
import { PublishDto } from './publisher/application/dtos/publish.dto';
import { BankingFacade } from 'src/banking/banking.facade';
import { CollectorBankAccountAdapter } from './collector/domain/bank-account';
import { format, subDays } from 'date-fns';

@Injectable()
export class SyncService {
  private logger = new Logger();

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

    if (!bankAccounts.length) {
      throw new Error('No bank accounts found');
    }

    this.logger.log(
      'Starting manual sync for bank accounts',
      bankAccounts.map((b) => b.id),
    );

    await this.collectorJob.add({
      from: format(new Date(), 'yyyy-MM-dd'),
      to: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
      bankAccountIds: bankAccounts.map((b) => b.id),
    });

    this.collectorJob.once('completed', async (job: Job<CollectResponse>) => {
      await this.publisherJob.add({
        sessionId: job.data.session.id,
      });
    });
  }
}
