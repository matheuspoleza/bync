import { Injectable, NotFoundException } from '@nestjs/common';
import { ConnectionLinkRepository } from '../banking/infra/connection-link.repository';
import { BelvoGateway } from 'src/belvo/infrastructure/belvo.gateway';

@Injectable()
export class AdminService {
  constructor(private readonly connectionLinkRepository: ConnectionLinkRepository, private readonly belvoGateway: BelvoGateway) {}

  async deleteLink(linkId: string): Promise<void> {
    const link = this.belvoGateway.getLinkById(linkId);

    if (!link) {
      throw new NotFoundException(`Link with linkId ${linkId} not found on Belvo`);
    }

    await this.belvoGateway.deleteLink(linkId);

    const connectionLink = await this.connectionLinkRepository.getByLinkId(linkId);

    if (!connectionLink) {
      throw new NotFoundException(`Connection link with linkId ${linkId} not found`);
    }

    await this.connectionLinkRepository.delete(connectionLink.id);
  }
}
