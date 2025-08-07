// src/infrastructure/email/universalEmailService.ts
import { createTransport, Transporter } from 'nodemailer';
import { EmailOptions, EmailProviderConfig, EmailProviderType } from './EmailTypes';
import Logger from '../logging/logger';
import config from '@infra/config/env';

export class UniversalEmailService {
  private providerConfig: EmailProviderConfig;

  constructor(providerConfig: EmailProviderConfig) {
    this.providerConfig = providerConfig;

    if (providerConfig.type === 'smtp' && !providerConfig.host) {
      throw new Error('SMTP requiere host y credenciales');
    }
  }

  async send(options: EmailOptions): Promise<boolean> {
    try {
      switch (this.providerConfig.type) {
        case 'smtp':
          return this.sendViaSMTP(options);
        default:
          throw new Error('Proveedor de correo no soportado');
      }
    } catch (error) {
      Logger.error('Error enviando correo', {
        service: this.providerConfig.type,
        error,
        context: JSON.stringify(options),
      });
      return false;
    }
  }

  private async sendViaSMTP(options: EmailOptions): Promise<boolean> {
    const transporter: Transporter = createTransport({
      host: this.providerConfig.host,
      port: this.providerConfig.port || 587,
      secure: this.providerConfig.secure || false,
      auth: this.providerConfig.auth,
    });

    const info = await transporter.sendMail({
      from: options.from || config.email.from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
    });

    Logger.debug('Correo enviado via SMTP', { message: info.messageId });
    return true;
  }

  // Método para cambiar proveedor en tiempo de ejecución
  setProvider(newConfig: EmailProviderConfig): void {
    this.providerConfig = newConfig;
    Logger.info('Proveedor de correo actualizado', { message: newConfig.type });
  }
}

export { EmailProviderType, EmailProviderConfig };
