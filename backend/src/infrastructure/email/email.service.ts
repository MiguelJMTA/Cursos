import config from '@infra/config/env';
import { UniversalEmailService } from './email.service.sender';
import { SMTPProviderConfig } from './email.types'; 


const getSMTPConfig = (): SMTPProviderConfig => {
  if (!config.email.smtp.smtpHost || !config.email.smtp.smtpUser || !config.email.smtp.smtpPass) {
    throw new Error('Faltan configuraciones SMTP necesarias');
  }

  return {
    type: 'smtp',
    host: config.email.smtp.smtpHost,
    port: config.email.smtp.smtpPort ? parseInt(config.email.smtp.smtpPort) : 587,
    secure: config.email.smtp.smtpSecure ,
    auth: {
      user: config.email.smtp.smtpUser,
      pass: config.email.smtp.smtpPass,
    },
  };
};

const smtpConfig = getSMTPConfig();
export const emailService = new UniversalEmailService(smtpConfig);

