import { DatabaseService } from 'src/common/database/database.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CollectorSessionRepository {
  static BUCKET_NAME = 'sessions_data';

  constructor(private readonly databaseService: DatabaseService) {}

  async saveSessionBackup<T = any>(session: any) {
    for (const {
      transactions,
      customerId,
      bankAccountID,
    } of session.accountsData) {
      const fileName = `${session.id}/${customerId}/${bankAccountID}.json`;
      const fileContent = JSON.stringify(transactions, null, 2);
      const fileBlob = new Blob([fileContent], { type: 'application/json' });

      const { error } = await this.databaseService.client.storage
        .from(CollectorSessionRepository.BUCKET_NAME)
        .upload(fileName, fileBlob);

      if (error) {
        throw error;
      }
    }
  }

  async fetchSessionBackup<T = any>(
    sessionID: string,
    bankAccounts: any[],
  ): Promise<any[]> {
    const accountsData: T[] = [];

    for (const bankAccount of bankAccounts) {
      const filePath = `${sessionID}/${bankAccount.customerId}/${bankAccount.id}.json`;

      // Download the file for the bank account
      const { data: blobData, error } =
        await this.databaseService.client.storage
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
      accountsData.push({
        id: bankAccount.id,
        customerId: bankAccount.customerId,
        transactions,
      } as any);
    }

    return accountsData;
  }
}
