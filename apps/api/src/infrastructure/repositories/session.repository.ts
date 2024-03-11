import { Injectable } from '@nestjs/common';
import { ISessionRepository, Session } from 'src/domain/session';
import { DatabaseService } from '../../__v2__/common/database/database.service';
import { Tables } from '../../__v2__/common/database/database.types';

@Injectable()
export class SessionRepository implements ISessionRepository {
  static TABLE_NAME = 'sessions';

  constructor(private readonly databaseService: DatabaseService) {}

  async getAll(): Promise<Session[]> {
    const { data } = await this.databaseService.client
      .from(SessionRepository.TABLE_NAME)
      .select('*');

    return data.map(
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
    const { data } = await this.databaseService.client
      .from(SessionRepository.TABLE_NAME)
      .select('*')
      .eq('id', id)
      .single();

    return new Session(
      data.id,
      new Date(data.start_date),
      new Date(data.end_date),
      data.bank_account_ids,
    );
  }

  async save(session: Session): Promise<void> {
    await this.databaseService.client
      .from(SessionRepository.TABLE_NAME)
      .insert([
        {
          id: session.id,
          start_date: session.startDate,
          end_date: session.endDate,
          bank_account_ids: session.bankAccountIDs,
        },
      ]);
  }
}
