import { Controller, Post } from '@nestjs/common';
import { BelvoService } from './belvo.service';

@Controller('belvo')
export class BelvoController {
  constructor(private readonly belvoService: BelvoService) {}

  @Post('session')
  async createSession() {
    return await this.belvoService.authenticate();
  }
}
