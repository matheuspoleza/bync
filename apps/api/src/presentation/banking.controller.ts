import { Controller, Param, Post } from '@nestjs/common';
import { BelvoService } from '../infrastructure/belvo/belvo.service';

@Controller('banking')
export class BankingController {
  constructor(private readonly belvoService: BelvoService) {}

  @Post('belvo/session')
  async createSession() {
    return this.belvoService.createAccessToken();
  }
}
