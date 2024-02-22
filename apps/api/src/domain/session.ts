export interface ISessionRepository {
  getAll(): Promise<Session[]>;
  save(session: Session): Promise<void>;
  getByID(id: string): Promise<Session>;
}

export class Session {
  constructor(
    public id: string,
    public startDate: Date,
    public endDate: Date,
    public bankAccountIDs: string[],
    public createdAt?: Date,
  ) {}
}
