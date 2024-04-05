import { DatabaseService } from 'src/common/database/database.service';
import { Injectable } from '@nestjs/common';
import {
  ISessionRepository,
  Session,
  SessionAccountData,
} from '../domain/session';

@Injectable()
export class SessionRepository implements ISessionRepository {
  static BUCKET_NAME = 'sessions_data';
  static TABLE_NAME = 'sync_sessions';

  constructor(private readonly databaseService: DatabaseService) {}

  async save(session: Session) {
    await Promise.all(
      session.data.map(async (sessionData) => {
        const fileName = `${session.id}/${sessionData.customerId}/${sessionData.bankAccountId}.json`;
        const fileContent = JSON.stringify(sessionData.transactions, null, 2);
        const fileBlob = new Blob([fileContent], { type: 'application/json' });

        const { error } = await this.databaseService.client.storage
          .from(SessionRepository.BUCKET_NAME)
          .upload(fileName, fileBlob);

        if (error) {
          throw error;
        }
      }),
    );

    await this.databaseService.client
      .from(SessionRepository.TABLE_NAME)
      .insert({
        id: session.id,
        from: session.from,
        to: session.to,
        customerIds: session.customerIds,
        bankAccountIds: session.bankAccountIds,
        createdAt: session.createdAt,
      });
  }

  async getOneById(sessionId: string): Promise<Session> {
    const { data: session } = await this.databaseService.client
      .from(SessionRepository.TABLE_NAME)
      .select('*')
      .eq('id', sessionId)
      .single();

    let accountsData: SessionAccountData[] = [];

    for (const bankAccount of session.bankAccountIds) {
      const filePath = `${sessionId}/${bankAccount.customerId}.json`;

      // Download the file for the bank account
      const { data: blobData, error } =
        await this.databaseService.client.storage
          .from(SessionRepository.BUCKET_NAME)
          .download(filePath);

      if (error) {
        throw new Error(
          `Failed to download data for bank account ${bankAccount.id}: ${error.message}`,
        );
      }

      // Parse the blob into JSON
      const textData = await new Response(blobData).text();
      const transactions = JSON.parse(textData);

      // Push the transactions data into the accountsData array
      accountsData.push({
        bankAccountId: bankAccount.id,
        customerId: bankAccount.customerId,
        transactions,
      });
    }

    return new Session({
      id: session.id,
      from: session.from,
      to: session.to,
      data: accountsData,
    });
  }
}
