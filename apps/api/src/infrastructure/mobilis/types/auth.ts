// authTokens.ts

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  expirationDate?: Date;
}
