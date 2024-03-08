import {
  BankAccountLink,
  BankAccountLinkStatus,
  IBankAccountLinkRepository,
  LinkDTO,
} from 'src/domain/bank-account-link';
import { DatabaseService, Tables } from '../../__v2__/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BankAccountLinkRepository implements IBankAccountLinkRepository {
  static TABLE_NAME = 'bank_account_link';

  constructor(private databaseService: DatabaseService) {}

  async getCustomerLinks(customerID: string): Promise<BankAccountLink[]> {
    const client = this.databaseService.getClient();

    const result = await client
      .schema('public')
      .from(BankAccountLinkRepository.TABLE_NAME)
      .select('*')
      .eq('customer_id', customerID);

    const data = result.data as Tables<'bank_account_link'>[];

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
    const client = this.databaseService.getClient();

    const { data, error } = await client
      .schema('public')
      .from(BankAccountLinkRepository.TABLE_NAME)
      .insert({ link_id: linkID, institution, customer_id: customerID })
      .select();

    if (!data || error) {
      console.error(error);
      throw new Error(`Failed to create bank account link: ${error.message}`);
    }

    const created = data[0] as Tables<'bank_account_link'>;

    return new BankAccountLink(
      created.id,
      created.link_id,
      created.institution,
      created.status as BankAccountLinkStatus,
      created.customer_id,
    );
  }

  async getOne(linkID: string): Promise<BankAccountLink | null> {
    const client = this.databaseService.getClient();

    const { error, data } = await client
      .schema('public')
      .from(BankAccountLinkRepository.TABLE_NAME)
      .select('*')
      .eq('link_id', linkID);

    if (error || !data || data?.length === 0) return null;

    const link = data[0] as Tables<'bank_account_link'>;

    return new BankAccountLink(
      link.id,
      link.link_id,
      link.institution,
      link.status as BankAccountLinkStatus,
      link.customer_id,
    );
  }

  async updateOne(link: BankAccountLink): Promise<void> {
    const client = this.databaseService.getClient();

    await client
      .schema('public')
      .from(BankAccountLinkRepository.TABLE_NAME)
      .update({ status: link.status })
      .eq('id', link.id)
      .throwOnError();
  }
}
