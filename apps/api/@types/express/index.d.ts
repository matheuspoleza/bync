declare namespace Express {
  export interface Request {
    user?: { userID: string };
    customerId?: string;
  }
}
