// src/infrastructure/config/env.ts
import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

const envPath = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';

dotenv.config({ path: path.resolve(process.cwd(), envPath) });

const envSchema = z.object({
  // Entorno y servidor
  NODE_ENV: z.enum(['development', 'production', 'test', 'staging']).default('development'),
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('0.0.0.0'),
  CORS_ORIGIN: z.string().default('*'),
  API_URL: z.string().default('http://localhost:3000'),
  WEB_URL: z.string().default('http://localhost:8080'),

  // Base de datos
  DB: z.string().default('postgresql'),
  DATABASE_URL: z.string().url(),
  DB_POOL_MIN: z.coerce.number().default(2),
  DB_POOL_MAX: z.coerce.number().default(10),
  DB_QUERY_TIMEOUT: z.coerce.number().default(5000),
  DB_SSL: z.coerce.string().default('true'),
  DB_HOST: z.coerce.string().default('postgres'),

  // Autenticación
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('1d'),
  REFRESH_TOKEN_EXPIRES: z.coerce.number().default(7), // días

  // Correo
  EMAIL_PROVIDER: z.enum(['sendgrid', 'mailgun', 'ses', 'smtp', 'resend']).default('smtp'),
  EMAIL_FROM: z.string().email().optional(),
  SENDGRID_API_KEY: z.string().optional(),
  MAILGUN_API_KEY: z.string().optional(),
  MAILGUN_DOMAIN: z.string().optional(),
  SMTP_HOST:  z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS:z.string().optional(),
  SMTP_SECURE:z.boolean().optional().default(true),
  AWS_REGION:z.string().optional(),

  // Redis
  REDIS_URL: z.string().url().optional(),
  REDIS_CACHE_TTL: z.coerce.number().default(1800), // segundos

  // Monitoreo
  SENTRY_DSN: z.string().url().optional(),
  DATADOG_API_KEY: z.string().optional(),

  // Feature flags
  FEATURE_CACHE_ENABLED: z.coerce.boolean().default(true),
  FEATURE_MAILING_ENABLED: z.coerce.boolean().default(true),
});

const envValidation = envSchema.safeParse(process.env);

if (!envValidation.success) {
  const errorMessage = '❌ Error en la configuración de entorno:';
  const errors = envValidation.error.errors
    .map((err) => `  - ${err.path.join('.')}: ${err.message}`)
    .join('\n');

  throw new Error(`${errorMessage}\n${errors}`);
}

const config = {
  // Entorno
  env: envValidation.data.NODE_ENV,
  isProduction: envValidation.data.NODE_ENV === 'production',
  isDevelopment: envValidation.data.NODE_ENV === 'development',
  isTest: envValidation.data.NODE_ENV === 'test',

  // Servidor
  server: {
    port: envValidation.data.PORT,
    host: envValidation.data.HOST,
    cors: {
      origin: envValidation.data.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  },

  // Base de datos
  database: {
    url: envValidation.data.DATABASE_URL,
    pool: {
      min: envValidation.data.DB_POOL_MIN,
      max: envValidation.data.DB_POOL_MAX,
    },
    timeout: envValidation.data.DB_QUERY_TIMEOUT,
    ssl: envValidation.data.DB_SSL,
    host:envValidation.data.DB_HOST 
  },

  // Autenticación
  auth: {
    jwtSecret: envValidation.data.JWT_SECRET,
    jwtExpiresIn: envValidation.data.JWT_EXPIRES_IN,
    refreshTokenExpires: envValidation.data.REFRESH_TOKEN_EXPIRES,
  },

  // Correo
  email: {
    provider: envValidation.data.EMAIL_PROVIDER,
    from: envValidation.data.EMAIL_FROM,
    apiKey: envValidation.data.SENDGRID_API_KEY ||  envValidation.data.MAILGUN_API_KEY ,
    sendgrid: {
      apiKey: envValidation.data.SENDGRID_API_KEY || '',
    },
    mailgun: {
      domain: envValidation.data.MAILGUN_DOMAIN || '',
    },
    smtp:{
      smtpHost: envValidation.data.SMTP_HOST,
      smtpPort: envValidation.data.SMTP_PORT,
      smtpUser: envValidation.data.SMTP_USER,
      smtpPass: envValidation.data.SMTP_PASS,
      smtpSecure: envValidation.data.SMTP_SECURE
    },
    aws:{
      region: envValidation.data.AWS_REGION
    },
    auth:{
      user: envValidation.data.SMTP_USER,
      pass: envValidation.data.SMTP_PASS
    }
  },

  // Redis
  redis: {
    url: envValidation.data.REDIS_URL,
    cacheTtl: envValidation.data.REDIS_CACHE_TTL,
  },

  // Monitoreo
  monitoring: {
    sentryDsn: envValidation.data.SENTRY_DSN || '',
    datadogApiKey: envValidation.data.DATADOG_API_KEY || '',
  },

  // Features
  features: {
    cacheEnabled: envValidation.data.FEATURE_CACHE_ENABLED,
    mailingEnabled: envValidation.data.FEATURE_MAILING_ENABLED,
  },

  // URLs de servicios
  services: {
    apiUrl: envValidation.data.API_URL,
    webUrl: envValidation.data.WEB_URL,
  },
} as const;

export type Environment = typeof config.env;
export type EmailProvider = typeof config.email.provider;
export type ServerConfig = typeof config.server;

export default config;
