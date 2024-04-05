import { Controller, Post, Body } from '@nestjs/common';
import { BelvoService } from '../application/belvo.service';
import { ZodApiBody } from '../../common';
import {
  WebhookEventDto,
  WebhookType,
  WebhookCode,
  webhookEventSchema,
} from './dto/webhook-event.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('belvo')
@ApiTags('belvo.webhook')
export class WebhooksController {
  constructor(private readonly belvoService: BelvoService) {}

  @Post('webhook')
  @ZodApiBody({ schema: webhookEventSchema })
  async receiveBelvoWebhook(@Body() event: WebhookEventDto) {
    if (
      event.webhook_type === WebhookType.Accounts &&
      (event.webhook_code === WebhookCode.HistoricalUpdate ||
        event.webhook_code === WebhookCode.NewAccountsAvailable)
    ) {
      console.log(
        `Handling belvo event: ${event.webhook_type} ${event.webhook_code}`,
      );
      await this.belvoService.handleNewAccountsAvailable(event.link_id);
    } else {
      console.log(
        `Ignoring belvo event: ${event.webhook_type} ${event.webhook_code}`,
      );
    }
  }
}
