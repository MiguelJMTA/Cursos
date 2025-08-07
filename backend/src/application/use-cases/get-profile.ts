import { IUserRepository } from '@domain/interfaces/user.repository';
import { User } from '@domain/entities/user';

export class GetUserProfileUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: number): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error('Usuario no encontrado');
    return user;
  }
}