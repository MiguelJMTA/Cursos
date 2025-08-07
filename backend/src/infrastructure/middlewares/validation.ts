import { Request, Response, NextFunction } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ApiResponse } from '@infra/utils/api-response';

export const validationMiddleware = (dto: ClassConstructor<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dto, req.body);
    const errors = await validate(dtoObj);

    if (errors.length > 0) {
      const message = errors
        .map(error => Object.values(error.constraints || {}))
        .join(', ');
      return ApiResponse.error(res, 400, message);
    }

    req.body = dtoObj;
    next();
  };
};