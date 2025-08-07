import { User } from "@domain/entities/user.entity";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        [key: string]: any;
      };
    }
  }
}