import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { YNABAccount } from 'src/domain/ynab-account';
import { YNABAccountRepository } from 'src/infrastructure/repositories/ynab-account.repository';
import { YNABRepository } from 'src/infrastructure/ynab/ynab.repository';

@Processor('ynab')
export class YnabImportConsumer {
  constructor(
    private readonly ynabRepository: YNABRepository,
    private readonly ynabAccountRepository: YNABAccountRepository,
  ) {}

  @Process()
  async import(job: Job<{ customerID: string }>) {
    const customerID = job.data.customerID;

    if (!customerID) {
      throw new Error('Customer not found');
    }

    const budgetAccounts =
      await this.ynabRepository.getAllBudgetsAccounts(customerID);

    const createdAccounts = await Promise.all(
      budgetAccounts.map(async (budgetAccount) => {
        const account = new YNABAccount(
          budgetAccount.name,
          budgetAccount.balance,
          budgetAccount.budgetID,
          budgetAccount.id,
        );
        return this.ynabAccountRepository.create(customerID, account);
      }),
    );

    console.log(
      `Created ${createdAccounts.length} accounts for ${budgetAccounts.length} ynab accounts for customer: ${customerID}`,
    );
  }
}
