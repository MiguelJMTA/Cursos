import { Response } from 'express';

export class ApiResponse {
  static success(
    res: Response,
    status: number,
    data: any,
    message?: string
  ) {
    return res.status(status).json({
      success: true,
      message: message || 'Operación exitosa',
      data
    });
  }

  static error(
    res: Response,
    status: number,
    message: string,
    details?: any
  ) {
    return res.status(status).json({
      success: false,
      message,
      details: details || undefined
    });
  }
}