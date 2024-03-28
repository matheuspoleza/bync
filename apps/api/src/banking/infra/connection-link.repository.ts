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

  async getByLinkId(linkID: string): Promise<ConnectionLink> {
    return new ConnectionLink({
      id: '',
      customerId: '',
      linkId: linkID,
      institution: 'Institution',
      status: ConnectionLinkStatus.CONNECTED,
    });
  }
}