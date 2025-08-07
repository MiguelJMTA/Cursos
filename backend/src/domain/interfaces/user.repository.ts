import { User } from "../entities/user";

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  createUser(user: User): Promise<User>;
}