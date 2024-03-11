import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../__v2__/common/database/database.service';
import { Tables } from '../../__v2__/common/database';

@Injectable()
export class YNABLinkRepository {
  static TABLE_NAME = 'ynab_link';

  constructor(private databaseService: DatabaseService) {}

  async create(bankAccountLink: string, ynabAccountLink: string) {
    const { data, error } = await this.databaseService.client
      .schema('public')
      .from(YNABLinkRepository.TABLE_NAME)
      .insert({
        bank_account_link: bankAccountLink,
        ynab_account_link: ynabAccountLink,
      })
      .select()
      .single();

    if (!data || error) {
      console.error(error);
      throw new Error(`Failed to create ynab link: ${error.message}`);
    }

    return {
      id: data.id,
      bankAccountLink,
      ynabAccountLink,
      lastSyncedAt: new Date(),
    };
  }
}
