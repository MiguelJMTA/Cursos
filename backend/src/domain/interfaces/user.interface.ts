export interface IUser {
  id?: number;
  email: string;
  password: string;
  name: string;
  career: string;
  semester: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}