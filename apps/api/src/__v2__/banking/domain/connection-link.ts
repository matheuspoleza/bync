export enum ConnectionLinkStatus {
  PENDING = 'pending',
  CONNECTED = 'connected',
  ERROR = 'error',
}

export class ConnectionLink {
  public id?: string;
  public customerID: string;
  public linkID: string;
  public institution: string;
  public status: ConnectionLinkStatus;

  constructor({
    id,
    linkID,
    customerID,
    status = ConnectionLinkStatus.PENDING,
    institution,
  }: {
    id?: string;
    customerID: string;
    linkID: string;
    institution: string;
    status: ConnectionLinkStatus;
  }) {
    this.id = id;
    this.customerID = customerID;
    this.linkID = linkID;
    this.status = status;
    this.institution = institution;
  }
}

export interface IConnectionLinkRepository {
  create: (connectionLink: ConnectionLink) => Promise<ConnectionLink>;
  getOne: (linkID: string) => Promise<ConnectionLink>;
}

export const IConnectionLinkRepository = Symbol('ConnectionLinkRepository');
