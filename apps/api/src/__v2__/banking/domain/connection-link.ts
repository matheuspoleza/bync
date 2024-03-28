export enum ConnectionLinkStatus {
  PENDING = 'pending',
  CONNECTED = 'connected',
  ERROR = 'error',
}

export class ConnectionLink {
  public id?: string;
  public customerId: string;
  public linkID: string;
  public institution: string;
  public status: ConnectionLinkStatus;

  constructor({
    id,
    linkID,
    customerId,
    status = ConnectionLinkStatus.PENDING,
    institution,
  }: {
    id?: string;
    customerId: string;
    linkID: string;
    institution: string;
    status: ConnectionLinkStatus;
  }) {
    this.id = id;
    this.customerId = customerId;
    this.linkID = linkID;
    this.status = status;
    this.institution = institution;
  }

  get connected() {
    return this.status === ConnectionLinkStatus.CONNECTED;
  }

  public connect() {
    this.status = ConnectionLinkStatus.CONNECTED;
  }
}

export interface IConnectionLinkRepository {
  create: (connectionLink: ConnectionLink) => Promise<ConnectionLink>;
  update: (connectionLink: ConnectionLink) => Promise<ConnectionLink>;
  getByLinkId: (linkId: string) => Promise<ConnectionLink>;
}

export const IConnectionLinkRepository = Symbol('ConnectionLinkRepository');
