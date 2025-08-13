import { IUserRepository } from '@domain/interfaces/user.repository';
import { PasswordHash } from '@infra/utils/password.service';
import { UserLogInRequest } from '@app/interfaces/user.login';
import { AuthTokenPayloadDto } from '@app/dtos/auth.token.payload';
import { IAuthTokenService } from '@app/interfaces/auth.token';

export class UserLogInUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private passwordService: PasswordHash,
    private readonly authTokenService: IAuthTokenService

  ) { }

  async execute(user_data: UserLogInRequest): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(user_data.email);
    if (!user || !user.id) {
      throw new Error('Credenciales inválidas')
    }

    const password_ok = await this.passwordService.compare(user_data.password, user.password)
    if (!password_ok) {
      throw new Error("Credenciales inválidas")
    }

    const payload: AuthTokenPayloadDto = {
      sub: user.id,
      email: user.email,
    };

    const token = this.authTokenService.generate(payload, { expiresIn: '1h' });
 
    return { token: token }
  }
}