import { IUserRepository } from '@domain/interfaces/user.repository';
import { User } from '@domain/entities/user';

export class GetUserProfileUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(user_id: number): Promise<User|null> {
    return await this.userRepository.findById(user_id);
  }
}