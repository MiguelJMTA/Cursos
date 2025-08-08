// email.types.ts

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }[];
}

// Solo dejamos 'smtp' por ahora, pero dejamos el tipo expandible
export type EmailProviderType = 'smtp';

export interface SMTPAuthConfig {
  user: string;
  pass: string;
}

// Como solo usarás SMTP, este es el único config por ahora
export interface SMTPProviderConfig {
  type: 'smtp';
  host: string;
  port?: number;     // Default: 587
  secure?: boolean;  // Default: false
  auth: SMTPAuthConfig;
}
