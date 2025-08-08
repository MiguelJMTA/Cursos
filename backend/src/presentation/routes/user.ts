import { Router } from 'express';
import { UserController } from '@pres/controllers/user';
import { authMiddleware } from '@infra/middlewares/auth';
import { validationMiddleware } from '@infra/middlewares/validation';
import { RegisterUserDto } from '@pres/dtos/user.register';
import { asyncHandler } from '@infra/utils/async.handler';

export const userRouter = (controller: UserController) => {
  const router = Router();

  // Ruta para registro, con validación del DTO y sin autenticación
  router.post(
    '/register',
    validationMiddleware(RegisterUserDto),
    asyncHandler(controller.register.bind(controller))
  );

  // Ruta para obtener perfil del usuario autenticado
  router.get(
    '/profile',
    authMiddleware,
    asyncHandler(controller.getProfile.bind(controller))
  );

  return router;
};
