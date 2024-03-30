export enum ConnectionLinkStatus {
  PENDING = 'pending',
  CONNECTED = 'connected',
  ERROR = 'error',
}

type IConnectionLink = {
  id?: string;
  customerId: string;
  linkId: string;
  institution: string;
  status: ConnectionLinkStatus;
};

export class ConnectionLink {
  public id!: string;
  public customerId: string;
  public linkId: string;
  public institution: string;
  public status: ConnectionLinkStatus;

  constructor(connectionLink: IConnectionLink) {
    this.customerId = connectionLink.customerId;
    this.linkId = connectionLink.linkId;
    this.status = connectionLink.status;
    this.institution = connectionLink.institution;

    if (connectionLink.id) {
      this.id = connectionLink.id;
    }
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
