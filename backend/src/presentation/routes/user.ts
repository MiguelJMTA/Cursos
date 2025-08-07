import { Router } from 'express';
import { UserController } from '@pres/controllers/user.controller';
import { authMiddleware } from '@infra/middlewares/auth.middleware';
import { validationMiddleware } from '@infra/middlewares/validation';
import { RegisterUserDto } from '@app/dtos/user.dto';

export const userRouter = (controller: UserController) => {
  const router = Router();

  router.post(
    '/register',
    validationMiddleware(RegisterUserDto),
    controller.register.bind(controller)
  );

  router.get(
    '/profile',
    authMiddleware,
    controller.getProfile.bind(controller)
  );

  return router;
};