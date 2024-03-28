import {
  ConnectionLink,
  ConnectionLinkStatus,
  IConnectionLinkRepository,
} from '../domain/connection-link';

export class ConnectionLinkRepository implements IConnectionLinkRepository {
  async create(connectionLink: ConnectionLink): Promise<ConnectionLink> {
    return connectionLink;
  }

  async getOne(linkID: string): Promise<ConnectionLink> {
    return new ConnectionLink({
      id: '',
      customerID: '',
      linkID,
      institution: 'Institution',
      status: ConnectionLinkStatus.CONNECTED,
    });
  }
}
