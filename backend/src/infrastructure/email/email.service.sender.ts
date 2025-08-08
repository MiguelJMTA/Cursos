import { createTransport } from 'nodemailer';
import { SMTPProviderConfig, EmailOptions } from './email.types';

export class UniversalEmailService {
  private providerConfig: SMTPProviderConfig;

  constructor(providerConfig: SMTPProviderConfig) {
    this.providerConfig = providerConfig;

    if (!providerConfig.host || !providerConfig.auth) {
      throw new Error('SMTP requiere host y credenciales');
    }
  }

  async send(options: EmailOptions): Promise<boolean> {
    try {
      return this.sendViaSMTP(options);
    } catch (error) {
      // log error
      return false;
    }
  }

  private async sendViaSMTP(options: EmailOptions): Promise<boolean> {
    const transporter = createTransport({
      host: this.providerConfig.host,
      port: this.providerConfig.port || 587,
      secure: this.providerConfig.secure || false,
      auth: this.providerConfig.auth,
    });

    const info = await transporter.sendMail({
      from: options.from,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
      replyTo: options.replyTo,
    });

    // log info.messageId
    return true;
  }
}
