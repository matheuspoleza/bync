import { Injectable } from '@nestjs/common';
import { ISessionRepository, Session } from 'src/domain/session';
import { DatabaseService } from '../../__v2__/common/database/database.service';
import { Tables } from '../../__v2__/common/database/database.types';

@Injectable()
export class SessionRepository implements ISessionRepository {
  static TABLE_NAME = 'sessions';

  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<Session[]> {
    const database = this.databaseService.getClient();

    const response = await database
      .from(SessionRepository.TABLE_NAME)
      .select('*');

    const sessionRows = response.data as Tables<'sessions'>[];

    return sessionRows.map(
      (row) =>
        new Session(
          row.id,
          new Date(row.start_date),
          new Date(row.end_date),
          row.bank_account_ids,
        ),
    );
  }

  async getByID(id: string): Promise<Session> {
    const database = this.databaseService.getClient();

    const response = await database
      .from(SessionRepository.TABLE_NAME)
      .select('*')
      .eq('id', id);

    const sessionRow = response.data[0] as Tables<'sessions'>;

    return new Session(
      sessionRow.id,
      new Date(sessionRow.start_date),
      new Date(sessionRow.end_date),
      sessionRow.bank_account_ids,
    );
  }

  async save(session: Session): Promise<void> {
    const client = this.databaseService.getClient();

    await client.from(SessionRepository.TABLE_NAME).insert([
      {
        id: session.id,
        start_date: session.startDate,
        end_date: session.endDate,
        bank_account_ids: session.bankAccountIDs,
      },
    ]);
  }
}
