// src/infrastructure/middlewares/requestLogger.ts
import { Request, Response, NextFunction } from 'express';
import Logger from '../logging/logger';
import { v4 as uuidv4 } from 'uuid';

export const requestLogger = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const traceId = uuidv4();

    // Registrar inicio de request
    Logger.verbose(`Inicio ${req.method} ${req.path}`, {
      context: 'HTTP ' + req.method,
      traceId,
      metadata: {
        path: req.path,
        ip: req.ip,
      },
    });

    // Hook para registrar fin de request
    res.on('finish', () => {
      const duration = Date.now() - start;

      Logger.info(`Fin ${req.method} ${req.path} - ${res.statusCode}`, {
        context: 'HTTP-' + req.method + '-' + res.statusCode,
        traceId,
        durationMs: duration,
      });
    });

    next();
  };
};
