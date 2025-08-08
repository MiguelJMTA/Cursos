import { UniversalEmailService } from '@infra/email/email.service.sender';
import { User } from '@domain/entities/user';
import config from '@infra/config/env';

export class SendVerificationEmailService {
  constructor(private readonly emailService: UniversalEmailService) {}

  async execute(user: User, token: string): Promise<void> {
    const verificationLink = `${config.services.apiUrl}/verify-email?token=${token}`;

    await this.emailService.send({
      to: user.email,
      subject: 'Verifica tu cuenta',
      html: `
        <h2>Bienvenido, ${user.name}</h2>
        <p>Por favor, verifica tu correo haciendo clic en el siguiente enlace:</p>
        <a href="${verificationLink}">Verificar mi cuenta</a>
      `,
      text: `Verifica tu cuenta visitando: ${verificationLink}`,
    });
  }
}
