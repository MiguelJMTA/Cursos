import { Request, Response } from 'express';
import { RegisterUserUseCase } from '@app/use-cases/user.register';
import { GetUserProfileUseCase } from '@app/use-cases/user.get.profile';
import { ApiResponse } from '@infra/utils/api.response';
import { UserLogInUseCase } from '@app/use-cases/user.login';

export class UserController {
  constructor(
    private readonly registerUseCase: RegisterUserUseCase,
    private readonly getProfileUseCase: GetUserProfileUseCase,
    private readonly loginUseCase: UserLogInUseCase,

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

  async logIn(req: Request, res: Response) {

    const data = req.body;

    const user = await this.loginUseCase.execute(data);

    ApiResponse.success(res, 200, user, "LogInfo");

  }
}