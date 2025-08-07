import { Request, Response } from 'express';
import { RegisterUserUseCase } from '@app/use-cases/register-user';
import { GetUserProfileUseCase } from '@app/use-cases/get-profile';
import { ApiResponse } from '@infra/utils/api-response';

export class UserController {
  constructor(
    private readonly registerUseCase: RegisterUserUseCase,
    private readonly getProfileUseCase: GetUserProfileUseCase
  ) { }

  async register(req: Request, res: Response) {
    try {
      const user = await this.registerUseCase.execute(req.body);
      return ApiResponse.success(res, 201, {
        id: user.id,
        email: user.email,
        name: user.name,
        career: user.career,
        semester: user.semester
      });
    } catch (error) {
      return ApiResponse.error(res, 400, 'Usuario no se pudo registrar'+error);
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) { throw new Error("No se encontró usuario") }
      const user = await this.getProfileUseCase.execute(userId);
      return ApiResponse.success(res, 200, {
        email: user.email,
        name: user.name,
        career: user.career,
        semester: user.semester
      });
    } catch (error) {
      return ApiResponse.error(res, 404, 'Usuario no encontrado');
    }
  }
}