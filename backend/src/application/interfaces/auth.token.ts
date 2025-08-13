import { AuthTokenPayloadDto } from "@app/dtos/auth.token.payload";

export interface IAuthTokenService {
  generate(payload: AuthTokenPayloadDto, options?: { expiresIn?: string | number }): string;
  verify(token: string): any;
}
