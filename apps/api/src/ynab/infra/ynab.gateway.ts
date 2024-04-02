import { Injectable } from '@nestjs/common';
import { Transaction, YNABCustomerAuthDTO } from './ynab.types';
import { SaveTransaction, API as YNABApi } from 'ynab';
import { RedisService } from '../../common/database';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { FormData } from 'formdata-node';
import { YnabAccount } from '../domain/ynab-account';

@Injectable()
export class YnabIntegration {
  constructor(
    private readonly redisService: RedisService,
    private configService: ConfigService,
  ) {}

  private isTokenExpired({ created_at, expires_in }: YNABCustomerAuthDTO) {
    const expirationTime = new Date(created_at * 1000 + expires_in * 1000);
    const currentTime = new Date();
    return currentTime > expirationTime;
  }

  private async getCustomerClient(customerId: string): Promise<YNABApi | null> {
    const clientSecret = this.configService.get<string>('YNAB_CLIENT_SECRET');
    const clientID = this.configService.get<string>('YNAB_CLIENT_ID');

    const customerAuth = await this.redisService.get<YNABCustomerAuthDTO>(
      `ynab:${customerId}`,
    );
    let authData = customerAuth;

    if (!authData) return null;

    const expired = this.isTokenExpired(authData);

    if (expired) {
      const response = await axios.post<YNABCustomerAuthDTO>(
        `https://app.ynab.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=refresh_token&refresh_token=${authData.refresh_token}`,
      );

      await this.storeAuth(customerId, response.data);

      authData = response.data;
    }

    return new YNABApi(authData.access_token);
  }

  private async storeAuth(customerId: string, authData: YNABCustomerAuthDTO) {
    return this.redisService.set(`ynab:${customerId}`, authData);
  }

  async authorize(
    customerId: string,
    {
      redirectURL,
      authCode,
    }: {
      redirectURL: string;
      authCode: string;
    },
  ) {
    const formData = new FormData();
    const clientSecret = this.configService.get<string>('YNAB_CLIENT_SECRET');
    const clientID = this.configService.get<string>('YNAB_CLIENT_ID');

    formData.append('client_id', clientID);

    formData.append('client_secret', clientSecret);
    formData.append('redirect_uri', redirectURL);
    formData.append('code', authCode);
    formData.append('grant_type', 'authorization_code');

    const { data } = await axios.post<YNABCustomerAuthDTO>(
      `https://app.ynab.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&redirect_uri=${redirectURL}&grant_type=authorization_code&code=${authCode}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    await this.storeAuth(customerId, data);
  }

  private async getBudgets(customerId: string) {
    const client = await this.getCustomerClient(customerId);

    if (!client) return [];

    const { data } = await client.budgets.getBudgets();
    return data.default_budget
      ? [data.default_budget]
      : [
          data.budgets.reduce((prev, current) => {
            if (current.name.includes('Archived')) return prev;

            if (!prev.last_modified_on || !current.last_modified_on)
              return current;

            return new Date(prev.last_modified_on) >
              new Date(current.last_modified_on)
              ? prev
              : current;
          }),
        ];
  }

  private async getAllBudgetsAccounts(customerId: string) {
    const client = await this.getCustomerClient(customerId);

    if (!client) return [];

    const budgets = await this.getBudgets(customerId);

    const accountsResponse = await Promise.all(
      budgets.flatMap((budget) =>
        client.accounts.getAccounts(budget.id).then((accounts) =>
          accounts.data.accounts.map((account) => ({
            ...account,
            budgetID: budget.id,
          })),
        ),
      ),
    );

    return accountsResponse.flatMap((accountResponse) => accountResponse);
  }

  public async getAllForCustomer(customerId: string): Promise<YnabAccount[]> {
    const ynabBudgetAccounts = await this.getAllBudgetsAccounts(customerId);
    return ynabBudgetAccounts.map(
      (ynabBudgetAccount) =>
        new YnabAccount({
          ynabAccountId: ynabBudgetAccount.id,
          name: ynabBudgetAccount.name,
          balance: ynabBudgetAccount.balance,
          type: ynabBudgetAccount.type,
          budgetId: ynabBudgetAccount.budgetID,
          customerId,
        }),
    );
  }

  public async createTransactions(
    accountId: string,
    customerId: string,
    transactions: Transaction[],
  ): Promise<Transaction[]> {
    const client = await this.getCustomerClient(customerId);

    if (!client) {
      throw new Error('Not authenticated');
    }

    const budgets = await this.getBudgets(customerId);

    const budget = budgets?.find(
      (b) => !!b.accounts?.find((a) => a.id === accountId),
    );

    if (!budget) {
      throw new Error('Budget not found');
    }

    const response = await client.transactions.createTransaction(budget.id, {
      transactions: transactions.reduce<SaveTransaction[]>((acc, t) => {
        if (!t) return acc;

        const id = `YNAB:${t.amount}:${t.date}`;
        const count = acc.filter((t) => t.import_id === id).length;
        const importID = `${id}:${count + 1}`;
        return [...acc, { ...t, account_id: accountId, import_id: importID }];
      }, []),
    });

    return response.data.transactions || [];
  }
}
