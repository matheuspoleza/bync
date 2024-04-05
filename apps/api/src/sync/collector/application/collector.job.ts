import { Logger } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CollectDto } from './dtos/collect.dto';
import { Session } from '../domain/session';
import { BankingFacade } from 'src/banking/banking.facade';
import { CollectorBankAccountAdapter } from '../domain/bank-account';
import { SessionRepository } from '../infra/session.repository';

@Processor('sync.collector')
export class CollectorJob {
  private logger = new Logger();

  constructor(
    private readonly bankingFacade: BankingFacade,
    private sessionRepository: SessionRepository,
  ) {}

  @Process()
  async collect(job: Job<CollectDto>) {
    this.logger.log('Collecting data for session');

    const { from, to, bankAccountIds } = job.data;
    const session = new Session({
      from,
      to,
    });

    const linkedBankAccounts = await this.bankingFacade.getAllBankAccountsByIds(
      bankAccountIds,
      new CollectorBankAccountAdapter(),
    );

    session.addBankAccounts(linkedBankAccounts);

    try {
      this.logger.debug('Fetching transactions');

      const transactions = await this.bankingFacade.getTransactionsBetween(
        session.bankAccountIds,
        from,
        to,
      );

      this.logger.debug('transactions fetched', { transactions });

      session.addTransactions(transactions);
    } catch (e) {
      this.logger.error((e as any).message);
      throw e;
    }

    await this.sessionRepository.save(session);
  }
}
