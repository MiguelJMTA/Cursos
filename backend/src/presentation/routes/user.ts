import { Router } from 'express';
import { UserController } from '@pres/controllers/user';
import { authMiddleware } from '@infra/middlewares/auth';
import { validationMiddleware } from '@infra/middlewares/validation';
import { RegisterUserDto } from '@pres/dtos/user.register';
import { asyncHandler } from '@infra/utils/async.handler';
import { UserLogInDto } from '@pres/dtos/login';

export const userRouter = (controller: UserController) => {
  const router = Router();

  router.post(
    '/register',
    validationMiddleware(RegisterUserDto),
    asyncHandler(controller.register.bind(controller))
  );

   router.post(
    '/login',
    validationMiddleware(UserLogInDto),
    asyncHandler(controller.logIn.bind(controller))
  );

  router.get(
    '/profile',
    authMiddleware,
    asyncHandler(controller.getProfile.bind(controller))
  );

  return router;
};
