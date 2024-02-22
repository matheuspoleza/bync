import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Belvo from 'belvo';

@Injectable()
export class BelvoService implements OnModuleInit {
  private client: Belvo;

  constructor(private readonly configService: ConfigService) {}

  public createAccessToken() {
    return this.client.widgetToken.create({
      widget: {
        branding: {
          company_name: 'Bync',
        },
      },
    });
  }

  async onModuleInit() {
    this.client = new Belvo(
      this.configService.get<string>('BELVO_SECRET_ID'),
      this.configService.get<string>('BELVO_SECRET_PASSWORD'),
      this.configService.get<string>('BELVO_HOST'),
    );

    await this.client.connect();
  }
}
