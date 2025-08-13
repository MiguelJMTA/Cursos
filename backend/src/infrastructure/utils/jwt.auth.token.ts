import { AuthTokenPayloadDto } from '@app/dtos/auth.token.payload';
import { IAuthTokenService } from '@app/interfaces/auth.token';
import config from '@infra/config/env';
import jwt, { SignOptions } from 'jsonwebtoken';

export class JwtAuthTokenService implements IAuthTokenService {
       constructor() { }

       generate(payload: AuthTokenPayloadDto, options?: { expiresIn?: string | number }): string {
              const signOptions: SignOptions = {};
              if (options?.expiresIn) {
                     signOptions.expiresIn = config.auth.jwtExpiresIn as SignOptions['expiresIn'];
              }

              return jwt.sign(payload, config.auth.jwtSecret, signOptions);
       }
       verify(token: string): AuthTokenPayloadDto | null {
              try {
                     const decoded = jwt.verify(token, config.auth.jwtSecret) as unknown;
                     return decoded as AuthTokenPayloadDto;
              } catch (error) {
                     return null;
              }
       }
}

