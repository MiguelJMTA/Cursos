import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '@infra/utils/api-response';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return ApiResponse.error(res, 401, 'Token no proporcionado');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      email: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    return ApiResponse.error(res, 403, 'Token inválido o expirado');
  }
};