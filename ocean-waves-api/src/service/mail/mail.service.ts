import { Injectable, Logger } from '@nestjs/common';
import { MailConfig } from 'src/config/nodemailer.config';
import { Transporter } from 'nodemailer';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    content?: string | Buffer;
    path?: string;
    contentType?: string;
  }>;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: Transporter;

  constructor(private readonly mailConfig: MailConfig) {
    this.transporter = this.mailConfig.createTransporter();
  }

  async sendMail(options: SendMailOptions): Promise<void> {
    try {
      const mailOptions = {
        from: options.from || this.mailConfig.getDefaultFrom(),
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        cc: options.cc
          ? Array.isArray(options.cc)
            ? options.cc.join(', ')
            : options.cc
          : undefined,
        bcc: options.bcc
          ? Array.isArray(options.bcc)
            ? options.bcc.join(', ')
            : options.bcc
          : undefined,
        attachments: options.attachments,
      };

      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent successfully to ${options.to}. MessageId: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${options.to}`, error);
      throw error;
    }
  }

  async sendHtmlMail(
    to: string | string[],
    subject: string,
    html: string,
    options?: Omit<SendMailOptions, 'to' | 'subject' | 'html'>,
  ): Promise<void> {
    return this.sendMail({
      to,
      subject,
      html,
      ...options,
    });
  }

  async sendTextMail(
    to: string | string[],
    subject: string,
    text: string,
    options?: Omit<SendMailOptions, 'to' | 'subject' | 'text'>,
  ): Promise<void> {
    return this.sendMail({
      to,
      subject,
      text,
      ...options,
    });
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      this.logger.log('SMTP connection verified successfully');
      return true;
    } catch (error) {
      this.logger.error('SMTP connection verification failed', error);
      return false;
    }
  }
}

