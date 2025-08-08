import { Request, Response } from 'express';
import { RegisterUserUseCase } from '@app/use-cases/user.register';
import { GetUserProfileUseCase } from '@app/use-cases/user.get.profile';
import { ApiResponse } from '@infra/utils/api.response';
import { PasswordHash } from '@infra/utils/password.service';
import { SequelizeUserRepository } from '@infra/database/repositories/user';

export class UserController {
  constructor(
    private readonly registerUseCase: RegisterUserUseCase,
    private readonly getProfileUseCase: GetUserProfileUseCase
  ) { }

  async register(req: Request, res: Response) {

    const data = req.body;

    const user = await this.registerUseCase.execute(data);

    ApiResponse.success(res, 200, user, "Usuario registrado");

  }

  async getProfile(req: Request, res: Response) {
    const userId = req.user?.id;
    if (!userId) { throw new Error("No se encontró usuario") }
    const user = await this.getProfileUseCase.execute(userId);
    if (!user) { throw new Error("No se encontró usuario") }

    ApiResponse.success(res, 200,
      user,
      "Perfil obtenido correctamente");
  }
}