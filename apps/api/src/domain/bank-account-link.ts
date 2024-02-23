export interface LinkDTO {
  linkID: string;
  institution: string;
}

export interface IBankAccountLinkRepository {
  getCustomerLinks(customerID: string): Promise<BankAccountLink[]>;
  createLink(customerID: string, linkDTO: LinkDTO): Promise<BankAccountLink>;
}

export enum BankAccountLinkStatus {
  PENDING = 'pending',
  CONNECTED = 'connected',
  ERROR = 'error',
}

export class BankAccountLink {
  constructor(
    public id: string,
    public linkID: string,
    public institution: string,
    public status: BankAccountLinkStatus,
  ) {
    this.id = id;
    this.linkID = linkID;
    this.institution = institution;
    this.status = status;
  }
}
