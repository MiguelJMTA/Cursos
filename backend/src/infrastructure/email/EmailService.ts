// src/infrastructure/email/emailService.ts
import config from '@infra/config/env';
import {
  UniversalEmailService,
  EmailProviderConfig,
  EmailProviderType,
} from './EmailServiceSender';

// Configuración desde environment variables
const getEmailConfig = (): EmailProviderConfig => {
  const type = (config.email.provider as EmailProviderType) || 'smtp';

  return {
    type,
    apiKey: config.email.apiKey,
    domain: config.email.mailgun.domain,
    host: config.email.smtp.smtpHost,
    port: config.email.smtp.smtpPort ? parseInt(config.email.smtp.smtpPort) : undefined,
    auth: config.email.auth
      ? {
          user: config.email.smtp.smtpUser ?? '',
          pass: config.email.smtp.smtpPass ?? '',
        }
      : undefined,
    region: config.email.aws.region ?? '',
  };
};

const emailConfig = getEmailConfig();
export const emailService = new UniversalEmailService(emailConfig);
