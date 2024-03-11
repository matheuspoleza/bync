import {
  BankAccountLink,
  BankAccountLinkStatus,
  IBankAccountLinkRepository,
  LinkDTO,
} from 'src/domain/bank-account-link';
import { DatabaseService } from '../../__v2__/common/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BankAccountLinkRepository implements IBankAccountLinkRepository {
  static TABLE_NAME = 'bank_account_link';

  constructor(private databaseService: DatabaseService) {}

  async getCustomerLinks(customerID: string): Promise<BankAccountLink[]> {
    const { data } = await this.databaseService.client
      .schema('public')
      .from(BankAccountLinkRepository.TABLE_NAME)
      .select('*')
      .eq('customer_id', customerID);

    return data.map(
      (link) =>
        new BankAccountLink(
          link.id,
          link.link_id,
          link.institution,
          link.status as BankAccountLinkStatus,
          link.customer_id,
        ),
    );
  }

  async createLink(
    customerID: string,
    { linkID, institution }: LinkDTO,
  ): Promise<BankAccountLink> {
    const { data, error } = await this.databaseService.client
      .schema('public')
      .from(BankAccountLinkRepository.TABLE_NAME)
      .insert({ link_id: linkID, institution, customer_id: customerID })
      .select()
      .single();

    if (!data || error) {
      console.error(error);
      throw new Error(`Failed to create bank account link: ${error.message}`);
    }

    return new BankAccountLink(
      data.id,
      data.link_id,
      data.institution,
      data.status as BankAccountLinkStatus,
      data.customer_id,
    );
  }

  async getOne(linkID: string): Promise<BankAccountLink | null> {
    const { error, data } = await this.databaseService.client
      .schema('public')
      .from(BankAccountLinkRepository.TABLE_NAME)
      .select('*')
      .eq('link_id', linkID)
      .single();

    if (error || !data) return null;

    return new BankAccountLink(
      data.id,
      data.link_id,
      data.institution,
      data.status as BankAccountLinkStatus,
      data.customer_id,
    );
  }

  async updateOne(link: BankAccountLink): Promise<void> {
    await this.databaseService.client
      .schema('public')
      .from(BankAccountLinkRepository.TABLE_NAME)
      .update({ status: link.status })
      .eq('id', link.id)
      .throwOnError();
  }
}
