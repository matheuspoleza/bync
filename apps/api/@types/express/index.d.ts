declare namespace Express {
  export interface Request {
    user?: { userID: string };
    customerID?: string;
  }
}
