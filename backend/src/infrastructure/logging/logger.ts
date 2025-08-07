// src/infrastructure/logging/logger.ts
import winston, { format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import config from '../config/env';

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  service?: string;
  context?: string;
  traceId?: string;
  userId?: string;
  durationMs?: number;
  error?: unknown; // Tipo corregido
  metadata?: Record<string, unknown>;
}

// Helper para normalizar errores
function toError(error: unknown): Error {
  if (error instanceof Error) return error;
  if (typeof error === 'string') return new Error(error);
  return new Error(`Non-Error value: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`);
}
// Formato de producción: JSON estructurado
const prodFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  format.errors({ stack: true }),
  format.json(),
);

// Formato de desarrollo: legible para humanos
const devFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: 'HH:mm:ss.SSS' }),
  format.printf(({ timestamp, level, message, context, traceId }) => {
    const contextInfo = context ? ` [${context}]` : '';
    const traceInfo = traceId ? ` (trace:${traceId})` : '';
    return `${timestamp} ${level}${contextInfo}${traceInfo}: ${message}`;
  }),
);

// Transporte para archivos rotativos (producción)
const fileTransport: DailyRotateFile = new DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
  format: prodFormat,
  auditFile: 'logs/audit.json',
  level: config.isProduction ? 'info' : 'debug',
});

// Transporte para errores críticos
const errorTransport = new transports.File({
  filename: 'logs/error.log',
  level: 'error',
  format: prodFormat,
});

// Transporte de consola (desarrollo)
const consoleTransport = new transports.Console({
  level: config.env === 'development' ? 'debug' : 'info',
  format: config.env === 'development' ? devFormat : prodFormat,
  handleExceptions: true,
});

// Configuración del logger principal
const logger = winston.createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    verbose: 4,
  },
  transports: [consoleTransport, ...(config.isProduction ? [fileTransport, errorTransport] : [])],
  exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],
  rejectionHandlers: [new transports.File({ filename: 'logs/rejections.log' })],
  exitOnError: false,
});

// API pública del logger
const Logger = {
  error: (message: string, meta?: Partial<LogEntry>) => logWithMetadata('error', message, meta),

  warn: (message: string, meta?: Partial<LogEntry>) => logWithMetadata('warn', message, meta),

  info: (message: string, meta?: Partial<LogEntry>) => logWithMetadata('info', message, meta),

  debug: (message: string, meta?: Partial<LogEntry>) => logWithMetadata('debug', message, meta),

  verbose: (message: string, meta?: Partial<LogEntry>) => logWithMetadata('verbose', message, meta),

  // Para medición de performance
  startTimer: () => {
    const start = process.hrtime.bigint();
    return (message: string, meta?: Partial<LogEntry>) => {
      const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
      logWithMetadata('info', `${message} - ${durationMs.toFixed(2)}ms`, { ...meta, durationMs });
    };
  },
};

function logWithMetadata(level: keyof typeof Logger, message: string, meta?: Partial<LogEntry>) {
  const { context, traceId, userId, error, ...restMeta } = meta || {};
  try {
    const baseEntry = {
      level,
      message,
      context,
      traceId,
      userId,
      ...restMeta,
    };

    if (error !== undefined) {
      logger.log({
        ...baseEntry,
        error: toError(error), // Usamos el helper
      });
    } else {
      logger.log(baseEntry);
    }
  } catch (error) {
    console.log('Error al crear el log: ', error);
  }
}

export default Logger;
