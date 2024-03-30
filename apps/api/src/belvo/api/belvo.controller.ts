import { Controller, HttpStatus, Post } from '@nestjs/common';
import { BelvoService } from '../application/belvo.service';
import { ZodApiResponse } from '../../common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSessionResponse } from './schema/create-session.request';

@Controller('belvo')
@ApiTags('belvo')
export class BelvoController {
  constructor(private readonly belvoService: BelvoService) {}

  @Post('session')
  @ZodApiResponse({ status: HttpStatus.OK, schema: CreateSessionResponse })
  async createSession(): Promise<CreateSessionResponse> {
    return this.belvoService.authenticate();
  }
}
