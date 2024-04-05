import { Inject, Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CollectDto } from './dtos/collect.dto';
import { ISessionRepository, Session } from '../domain/session';
import { BankingFacade } from 'src/banking/banking.facade';
import { CollectorBankAccountAdapter } from '../domain/bank-account';

@Injectable()
@Processor('sync.collector')
export class CollectorJob {
  constructor(
    private readonly bankingFacade: BankingFacade,
    @Inject(ISessionRepository) private sessionRepository: ISessionRepository,
  ) {}

  @Process()
  async collect(job: Job<CollectDto>) {
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

    const transactions = await this.bankingFacade.getTransactionsBetween(
      session.bankAccountIds,
      from,
      to,
    );

    session.addTransactions(transactions);

    await this.sessionRepository.save(session);
  }
}
