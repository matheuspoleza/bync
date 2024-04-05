import Belvo, { AccountsReturn, TransactionsReturn } from 'belvo';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from 'src/common';

const COMPANY_NAME = 'Bync';

export enum BelvoAccountCategory {
  AdvanceDepositAccount = 'ADVANCE_DEPOSIT_ACCOUNT',
  CheckingAccount = 'CHECKING_ACCOUNT',
  CreditCard = 'CREDIT_CARD',
  FinancingAccount = 'FINANCING_ACCOUNT',
  InvestmentAccount = 'INVESTMENT_ACCOUNT',
  InvoiceFinancingAccount = 'INVOICE_FINANCING_ACCOUNT',
  LoanAccount = 'LOAN_ACCOUNT',
  PensionFundAccount = 'PENSION_FUND_ACCOUNT',
  SavingsAccount = 'SAVINGS_ACCOUNT',
  Uncategorized = 'UNCATEGORIZED',
}

export enum BelvoAccountInstutionType {
  Bank = 'bank',
  Fiscal = 'fiscal',
  Employment = 'employment',
}

type Transaction = TransactionsReturn & { external_account_id: string };

/*
Indicates whether this account is either an ASSET or a LIABILITY.
You can consider the balance of an ASSET as being positive, while the balance of a LIABILITY as negative.
 */
export enum BelvoAccountBalanceType {
  Asset = 'ASSET',
  Liability = 'LIABILITY',
}

export type OFDABrazilAccount = AccountsReturn & {
  subtype: string;
  balance_type: BelvoAccountBalanceType;
  category: BelvoAccountCategory;
  institution: {
    name: string;
    type: BelvoAccountInstutionType;
  };
};

@Injectable()
export class BelvoGateway implements OnModuleInit {
  private client!: Belvo;

  constructor(
    private readonly configService: ConfigService,
    private readonly databaseService: DatabaseService,
  ) {}

  async onModuleInit() {
    this.client = new Belvo(
      this.configService.get<string>('BELVO_SECRET_ID', ''),
      this.configService.get<string>('BELVO_SECRET_PASSWORD', ''),
      this.configService.get<string>('BELVO_HOST', ''),
    );

    await this.client.connect();
  }

  public createWidgetAccessToken() {
    return this.client.widgetToken.create({
      widget: {
        branding: {
          company_name: COMPANY_NAME,
        },
      },
    });
  }

  async getTransactionsBetween(
    linkId: string,
    from: string,
    to: string,
  ): Promise<Transaction[]> {
    const transactions = await this.client.transactions.retrieve(
      linkId,
      from,
      to,
      {
        account: 'all',
        saveData: true,
      },
    );

    console.log('###### BELVO TRANSACTIONS #####', { transactions });

    return Promise.all(
      transactions.map(async (transaction) => {
        const externalAccountId = await this.getAccountIdByExternalId(
          transaction.account.id ?? '',
        );

        return {
          ...transaction,
          external_account_id: externalAccountId,
        };
      }),
    );
  }

  async getAccounts(linkId: string) {
    return (await this.client.accounts.retrieve(linkId)) as OFDABrazilAccount[];
  }

  async getLinkById(linkId: string) {
    return this.client.links.detail(linkId);
  }

  async deleteLink(linkId: string) {
    return this.client.links.delete(linkId);
  }

  public async saveExternalIdReference(
    belvoAccountId: string,
    externalAccountId: string,
  ) {}

  public async getAccountIdByExternalId(
    externalAccountId: string,
  ): Promise<string> {
    return '';
  }
}
