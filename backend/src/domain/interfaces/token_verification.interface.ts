export interface ITokenVerification {
  token: string;
  userId: number;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}