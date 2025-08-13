import { User } from "@domain/entities/user";
import { Login } from "@domain/entities/user.login";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  createUser(user: User): Promise<User>;
  userLogIn(loginInfo: Login): Promise<User|null>;
}