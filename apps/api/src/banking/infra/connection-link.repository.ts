import {
  ConnectionLink,
  ConnectionLinkStatus,
  IConnectionLinkRepository,
} from '../domain/connection-link';

export class ConnectionLinkRepository implements IConnectionLinkRepository {
  async create(connectionLink: ConnectionLink): Promise<ConnectionLink> {
    return connectionLink;
  }

  async update(connectionLink: ConnectionLink): Promise<ConnectionLink> {
    return connectionLink;
  }

  async getByLinkId(linkId: string): Promise<ConnectionLink> {
    return new ConnectionLink({
      id: '',
      customerId: '',
      linkId: linkId,
      institution: 'Institution',
      status: ConnectionLinkStatus.CONNECTED,
    });
  }
}
