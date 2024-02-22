import { CollectorSession } from '../../domain/collector-session';
import { CollectorAccountData } from '../../domain/collector-account';
import { Transaction } from 'src/infrastructure/mobilis/types/transaction';
import { BankAccount } from 'src/domain/bank-account';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CollectorSessionRepository {
  static BUCKET_NAME = 'sessions_data';

  constructor(private readonly databaseService: DatabaseService) {}

  async saveSessionBackup<T = Transaction>(session: CollectorSession<T>) {
    for (const {
      transactions,
      customerID,
      bankAccountID,
    } of session.accountsData) {
      const fileName = `${session.id}/${customerID}/${bankAccountID}.json`;
      const fileContent = JSON.stringify(transactions, null, 2);
      const fileBlob = new Blob([fileContent], { type: 'application/json' });

      const client = this.databaseService.getClient();

      const { error } = await client.storage
        .from(CollectorSessionRepository.BUCKET_NAME)
        .upload(fileName, fileBlob);

      if (error) {
        throw error;
      }
    }
  }

  async fetchSessionBackup<T = Transaction>(
    sessionID: string,
    bankAccounts: BankAccount[],
  ): Promise<CollectorAccountData<T>[]> {
    const client = this.databaseService.getClient();

    const accountsData: CollectorAccountData<T>[] = [];

    for (const bankAccount of bankAccounts) {
      const filePath = `${sessionID}/${bankAccount.customerID}/${bankAccount.id}.json`;

      // Download the file for the bank account
      const { data: blobData, error } = await client.storage
        .from(CollectorSessionRepository.BUCKET_NAME)
        .download(filePath);

      if (error) {
        throw new Error(
          `Failed to download data for bank account ${bankAccount.id}: ${error.message}`,
        );
      }

      // Parse the blob into JSON
      const textData = await new Response(blobData).text();
      const transactions: T[] = JSON.parse(textData);

      // Push the transactions data into the accountsData array
      accountsData.push(
        new CollectorAccountData(
          bankAccount.id,
          bankAccount.customerID,
          transactions,
        ),
      );
    }

    return accountsData;
  }
}
