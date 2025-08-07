// Tipos para mantener consistencia
export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }[];
}

export type EmailProviderType = 'sendgrid' | 'mailgun' | 'ses' | 'smtp' | 'resend';

export interface EmailProviderConfig {
  type: EmailProviderType;
  apiKey?: string;
  domain?: string;
  host?: string;
  port?: number;
  secure?: boolean;
  auth?: {
    user: string;
    pass: string;
  };
  region?: string;
}
