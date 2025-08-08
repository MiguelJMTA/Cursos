import { UserModel } from '@infra/database/models/user';
import { IUserRepository } from '@domain/interfaces/user.repository';
import { User } from '@domain/entities/user';

export class SequelizeUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) return null;
    
    return new User(
      user.email,
      user.password,
      user.name,
      user.career,
      user.semester,
      user.id
    );
  }

  async findById(id: number): Promise<User | null> {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) return null;
    
    return new User(
      user.email,
      user.password,
      user.name,
      user.career,
      user.semester,
      user.id
    );
  }

  async createUser(user: User): Promise<User> {
    const newUser = await UserModel.create({
      email: user.email,
      password: user.password,
      name: user.name,
      career: user.career,
      semester: user.semester
    });

    return new User(
      newUser.email,
      newUser.password,
      newUser.name,
      newUser.career,
      newUser.semester,
      newUser.id
    );
  }
}