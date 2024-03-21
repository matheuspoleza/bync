import Belvo from 'belvo';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const COMPANY_NAME = 'Bync';

@Injectable()
export class BelvoGateway implements OnModuleInit {
  private client!: Belvo;

  constructor(private readonly configService: ConfigService) {}

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

  async getAccounts(linkID: string) {
    return this.client.accounts.retrieve(linkID);
  }
}
