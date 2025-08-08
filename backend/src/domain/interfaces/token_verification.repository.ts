export interface ITokenRepository {
  generateVerificationToken(userId: number): Promise<string>;
  validateVerificationToken(token: string): Promise<number>; 
}