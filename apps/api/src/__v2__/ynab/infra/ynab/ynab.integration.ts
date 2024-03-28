import { Injectable } from '@nestjs/common';
import { Transaction, YNABCustomerAuthDTO } from './ynab.types';
import { API as YNABApi } from 'ynab';
import { RedisService } from '../../../common/database';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { FormData } from 'formdata-node';
import { IYnabIntegration } from '../../domain/ynab.integration';
import { YnabAccount } from '../../domain/ynab-account';

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

  private async getCustomerClient(customerID: string): Promise<YNABApi | null> {
    const clientSecret = this.configService.get<string>('YNAB_CLIENT_SECRET');
    const clientID = this.configService.get<string>('YNAB_CLIENT_ID');

    const customerAuth = await this.redisService.get<YNABCustomerAuthDTO>(
      `ynab:${customerID}`,
    );
    let authData = customerAuth;

    if (!authData) return null;

    const expired = this.isTokenExpired(authData);

    if (expired) {
      const response = await axios.post<YNABCustomerAuthDTO>(
        `https://app.ynab.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=refresh_token&refresh_token=${authData.refresh_token}`,
      );

      await this.storeAuth(customerID, response.data);

      authData = response.data;
    }

    return new YNABApi(authData.access_token);
  }

  private async storeAuth(customerID: string, authData: YNABCustomerAuthDTO) {
    return this.redisService.set(`ynab:${customerID}`, authData);
  }

  async authorize(
    customerID: string,
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

    await this.storeAuth(customerID, data);
  }

  private async getBudgets(customerID: string) {
    const client = await this.getCustomerClient(customerID);

    if (!client) return [];

    const { data } = await client.budgets.getBudgets();
    return data.default_budget
      ? [data.default_budget]
      : [
          data.budgets.reduce((prev, current) => {
            if (current.name.includes('Archived')) return prev;

            return new Date(prev.last_modified_on) >
              new Date(current.last_modified_on)
              ? prev
              : current;
          }),
        ];
  }

  private async getAllBudgetsAccounts(customerID: string) {
    const client = await this.getCustomerClient(customerID);

    if (!client) return [];

    const budgets = await this.getBudgets(customerID);

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

  public async getAllForCustomer(customerID: string): Promise<YnabAccount[]> {
    const ynabBudgetAccounts = await this.getAllBudgetsAccounts(customerID);
    return ynabBudgetAccounts.map(
      (ynabBudgetAccount) =>
        new YnabAccount({
          ynabAccountID: ynabBudgetAccount.id,
          name: ynabBudgetAccount.name,
          balance: ynabBudgetAccount.balance,
          type: ynabBudgetAccount.type,
        }),
    );
  }

  public async createTransactions(
    accountID: string,
    customerID: string,
    transactions: Transaction[],
  ): Promise<Transaction[]> {
    const client = await this.getCustomerClient(customerID);

    if (!client) {
      throw new Error('Not authenticated');
    }

    const budgets = await this.getBudgets(customerID);

    const budget = budgets?.find(
      (b) => !!b.accounts?.find((a) => a.id === accountID),
    );

    if (!budget) {
      throw new Error('Budget not found');
    }

    const response = await client.transactions.createTransaction(budget.id, {
      transactions: transactions.reduce((acc, t) => {
        const id = `YNAB:${t.amount}:${t.date}`;
        const count = acc.filter((t) => t.import_id === id).length;
        const importID = `${id}:${count + 1}`;
        return [...acc, { ...t, account_id: accountID, import_id: importID }];
      }, []),
    });

    return response.data.transactions;
  }
}
