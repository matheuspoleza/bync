import { Injectable } from '@nestjs/common';
import { Transaction, YNABCustomerAuthDTO } from './types';
import { API as YNABApi } from 'ynab';
import { RedisService } from '../database';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class YNABRepository {
  constructor(
    private readonly redisService: RedisService,
    private configService: ConfigService,
  ) {}

  private isTokenExpired({ created_at, expires_in }: YNABCustomerAuthDTO) {
    const expirationTime = new Date(created_at * 1000 + expires_in * 1000);
    const currentTime = new Date();

    console.log({ expirationTime, currentTime });

    return currentTime > expirationTime;
  }

  private async getCustomerClient(customerID: string) {
    const clientSecret = this.configService.get<string>('YNAB_CLIENT_SECRET');
    const clientID = this.configService.get<string>('YNAB_CLIENT_ID');

    const customerAuth = await this.redisService.get<YNABCustomerAuthDTO>(
      `ynab:${customerID}`,
    );
    let authData = customerAuth;

    const expired = this.isTokenExpired(authData);

    console.log({ expired });

    if (expired) {
      const response = await axios.post<YNABCustomerAuthDTO>(
        `https://app.ynab.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=refresh_token&refresh_token=${authData.refresh_token}`,
      );

      await this.storeAuth(customerID, response.data);

      authData = response.data;
    }

    return new YNABApi(authData.access_token);
  }

  public async storeAuth(customerID: string, authData: YNABCustomerAuthDTO) {
    return this.redisService.set(`ynab:${customerID}`, authData);
  }

  public async authorize({
    redirectURL,
    authCode,
  }: {
    redirectURL: string;
    authCode: string;
  }) {
    const formData = new FormData();
    const clientSecret = this.configService.get<string>('YNAB_CLIENT_SECRET');
    const clientID = this.configService.get<string>('YNAB_CLIENT_ID');

    formData.append('client_id', clientID);

    formData.append('client_secret', clientSecret);
    formData.append('redirect_uri', redirectURL);
    formData.append('code', authCode);
    formData.append('grant_type', 'authorization_code');

    return axios.post<YNABCustomerAuthDTO>(
      `https://app.ynab.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&redirect_uri=${redirectURL}&grant_type=authorization_code&code=${authCode}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }

  public async getBudgets(customerID: string) {
    const client = await this.getCustomerClient(customerID);
    return client.budgets.getBudgets();
  }

  public async getAllBudgetsAccounts(customerID: string) {
    const client = await this.getCustomerClient(customerID);
    const { data } = await client.budgets.getBudgets();

    const accountsResponse = await Promise.all(
      data.budgets.flatMap((budget) => client.accounts.getAccounts(budget.id)),
    );

    return accountsResponse.flatMap(
      (accountResponse) => accountResponse.data.accounts,
    );
  }

  public async createTransactions(
    accountID: string,
    customerID: string,
    transactions: Transaction[],
  ): Promise<Transaction[]> {
    const client = await this.getCustomerClient(customerID);

    const budgets = await client.budgets.getBudgets(true);

    const budget = budgets.data.budgets?.find(
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
