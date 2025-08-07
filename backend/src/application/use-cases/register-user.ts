import { IUserRepository } from '@domain/interfaces/user.repository';
import { User } from '@domain/entities/user';

export class RegisterUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(user_data: User): Promise<User> {
    const user = await this.userRepository.createUser(user_data);
    if (!user) throw new Error('Usuario no registrado');
    return user;
  }
}