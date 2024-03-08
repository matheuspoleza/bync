import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../__v2__/common/database/database.service';
import { Tables } from '../../__v2__/common/database';

@Injectable()
export class YNABLinkRepository {
  static TABLE_NAME = 'ynab_link';

  constructor(private databaseService: DatabaseService) {}

  async create(bankAccountLink: string, ynabAccountLink: string) {
    const client = this.databaseService.getClient();

    const { data, error } = await client
      .schema('public')
      .from(YNABLinkRepository.TABLE_NAME)
      .insert({
        bank_account_link: bankAccountLink,
        ynab_account_link: ynabAccountLink,
      })
      .select();

    if (!data || error) {
      console.error(error);
      throw new Error(`aFailed to create ynab link: ${error.message}`);
    }

    const created = data[0] as Tables<'ynab_link'>;

    return {
      id: created.id,
      bankAccountLink,
      ynabAccountLink,
      lastSyncedAt: new Date(),
    };
  }
}
