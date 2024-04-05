import { Injectable } from '@nestjs/common';
import { SessionDto } from './application/dtos/session.dto';
import { SessionRepository } from './infra/session.repository';

@Injectable()
export class CollectorFacade {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async getSession(sessionId: string): Promise<SessionDto> {
    return this.sessionRepository.getOneById(sessionId);
  }
}
