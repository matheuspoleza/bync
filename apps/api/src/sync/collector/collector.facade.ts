import { Inject, Injectable } from '@nestjs/common';
import { ISessionRepository, Session } from './domain/session';
import { SessionDto } from './application/dtos/session.dto';

@Injectable()
export class CollectorFacade {
  constructor(
    @Inject(ISessionRepository)
    private readonly sessionRepository: ISessionRepository,
  ) {}

  async getSession(sessionId: string): Promise<SessionDto> {
    return this.sessionRepository.getOneById(sessionId);
  }
}
