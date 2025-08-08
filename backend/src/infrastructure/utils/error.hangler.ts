import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from './api.response';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  ApiResponse.error(res, 500, err.message || 'Error interno del servidor');
};