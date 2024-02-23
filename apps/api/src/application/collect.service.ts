import { Inject, Injectable } from '@nestjs/common';
import { CollectorSession } from '../domain/collector-session';
import { CollectorRepository } from '../infrastructure/repositories/collector.repository';
import { Transaction } from 'src/infrastructure/mobilis/types/transaction';
import { SessionRepository } from 'src/infrastructure/repositories/session.repository';
import { BankAccountRepository } from 'src/infrastructure/repositories/bank-account.repository';
import { CustomerRepository } from 'src/infrastructure/repositories/customer.repository';
import { LocalDate, convert } from '@js-joda/core';
import { CollectorSessionRepository } from 'src/infrastructure/repositories/collector-session.repository';

@Injectable()
export class CollectService {
  constructor(
    private readonly collectorRepository: CollectorRepository,
    private readonly collectorSessionRepository: CollectorSessionRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly bankAccountRepository: BankAccountRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  private createDateFromString(dateStr: string): Date {
    const parts = dateStr.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(Date.UTC(year, month, day));
  }

  async collectTransactions(startDate: string, endDate: string) {
    const start = this.createDateFromString(startDate);
    const end = this.createDateFromString(endDate);
    const customerIDs = (await this.customerRepository.getAll()).map(
      (c) => c.id,
    );

    const bankAccounts = await this.bankAccountRepository.getAllForCustomers(
      customerIDs,
    );

    const session = new CollectorSession<Transaction>(
      start,
      end,
      bankAccounts.map((account) => account.id),
    );

    const collectedData =
      await this.collectorRepository.runCrawlerForBankingTransactions({
        startDate: session.startDate,
        endDate: session.endDate,
        bankAccounts,
      });

    session.addData(collectedData);

    await this.sessionRepository.save({
      ...session,
      bankAccountIDs: session.bankAccountIDs,
    });

    await this.collectorSessionRepository.saveSessionBackup(session);

    return session;
  }
}
