import { IUserRepository } from '@domain/interfaces/user.repository';
import { RegisterUserRequest } from '@app/interfaces/user.register';
import { PasswordHash } from '@infra/utils/password.service';
import { User } from '@domain/entities/user';
import { ITokenRepository } from '@domain/interfaces/token_verification.repository';
import { SendVerificationEmailService } from '@domain/services/sendVerificationEmail';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private passwordService: PasswordHash,
    private verificationEmailService: SendVerificationEmailService, 
    private tokenService: ITokenRepository
  ) { }

  async execute(user_data: RegisterUserRequest): Promise<User> {
    const password_hashed = await this.passwordService.hash(user_data.password)

    const user = new User(
      user_data.email,
      password_hashed,
      user_data.name,
      user_data.career,
      user_data.semester
    )
    const savedUser = await this.userRepository.createUser(user);

    if (!savedUser?.id) {
      throw new Error("Error al guardar el usuario")
    }
    const verificationToken = await this.tokenService.generateVerificationToken(savedUser.id);

    await this.verificationEmailService.execute(savedUser, verificationToken);

    return savedUser;

  }
}