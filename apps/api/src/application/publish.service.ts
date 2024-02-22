import { Injectable } from '@nestjs/common';
import { PublishAccountData } from 'src/domain/publish-session';
import { PlatformsService } from 'src/infrastructure/platforms.service';
import { BankAccountRepository } from 'src/infrastructure/repositories/bank-account.repository';
import { CollectorSessionRepository } from 'src/infrastructure/repositories/collector-session.repository';
import { SessionRepository } from 'src/infrastructure/repositories/session.repository';
import { YNABRepository } from 'src/infrastructure/ynab/ynab.repository';

@Injectable()
export class PublishService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly collectorSessionRepository: CollectorSessionRepository,
    private readonly bankAccountRepository: BankAccountRepository,
    private readonly platformsService: PlatformsService,
    private readonly ynabRepository: YNABRepository,
  ) {}

  public async publishSession(sessionID: string) {
    const session = await this.sessionRepository.getByID(sessionID);

    const bankAccounts = await this.bankAccountRepository.getAllByIDs(
      session.bankAccountIDs,
    );

    const transactionsData =
      await this.collectorSessionRepository.fetchSessionBackup(
        session.id,
        bankAccounts,
      );

    const publishData = transactionsData.map((data) => {
      const bankAccount = bankAccounts.find((b) => b.id === data.bankAccountID);

      return new PublishAccountData(
        data.customerID,
        bankAccount.ynabName,
        bankAccount.ynabAccountID,
        data.transactions.map((t) =>
          this.platformsService.fromMobilisToYnab(t),
        ),
      );
    });

    // TODO: finish implementation
    return Promise.all(
      publishData.map((data) =>
        this.ynabRepository.createTransactions(
          data.ynabAccountID,
          data.customerID,
          data.ynabTransactions,
        ),
      ),
    );
  }
}
