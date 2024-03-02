export interface LinkDTO {
  linkID: string;
  institution: string;
}

export interface IBankAccountLinkRepository {
  getCustomerLinks(customerID: string): Promise<BankAccountLink[]>;
  createLink(customerID: string, linkDTO: LinkDTO): Promise<BankAccountLink>;
  getOne(linkID: string): Promise<BankAccountLink | null>;
  updateOne(link: BankAccountLink): Promise<void>;
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
    public customerID: string,
  ) {}
}
