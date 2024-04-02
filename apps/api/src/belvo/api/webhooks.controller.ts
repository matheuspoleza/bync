import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { BelvoService } from '../application/belvo.service';
import { ZodValidationPipe } from '../../common';
import {
  webhookAccountEventSchema,
  WebhookEventDto,
  WebhookType,
  WebhookCode,
} from './dto/webhook-event.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('belvo')
@ApiTags('belvo.webhook')
export class WebhooksController {
  constructor(private readonly belvoService: BelvoService) {}

  @Post('webhook')
  @UsePipes(new ZodValidationPipe(webhookAccountEventSchema))
  async receiveBelvoWebhook(@Body() event: WebhookEventDto) {
    if (
      event.webhook_type === WebhookType.Accounts &&
      event.webhook_code === WebhookCode.HistoricalUpdate
    ) {
      await this.belvoService.setupAccounts(event.link_id);
    }
  }
}