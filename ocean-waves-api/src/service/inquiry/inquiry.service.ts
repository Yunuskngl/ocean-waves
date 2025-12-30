import { InquiryRepository } from "src/repository/inquiry/inquiry.repository";
import { Injectable, Logger } from "@nestjs/common";
import { InquiryCreateDto } from "src/domain/dto/request/inquiry-create.dto";
import { InquirySearchFilterDto } from "src/domain/dto/request/inquiry-search-filter.dto";
import { MailService } from "../mail/mail.service";

@Injectable()
export class InquiryService {
  private readonly logger = new Logger(InquiryService.name);

  constructor(
    private readonly inquiryRepository: InquiryRepository,
    private readonly mailService: MailService,
  ) {}

  async createInquiry(inquiry: InquiryCreateDto) {
    const createdInquiry = await this.inquiryRepository.create(inquiry);

    try {
      const adminEmail = process.env.SMTP_USER;
      if (!adminEmail) {
        this.logger.warn('SMTP_USER environment variable is not set. Email notification skipped.');
        return createdInquiry;
      }

      const htmlContent = this.buildInquiryNotificationEmail(inquiry);
      const textContent = this.buildInquiryNotificationEmailText(inquiry);

      await this.mailService.sendMail({
        to: adminEmail,
        subject: `Yeni İletişim Formu: ${inquiry.subject}`,
        html: htmlContent,
        text: textContent,
      });

      this.logger.log(`Inquiry notification email sent to admin for inquiry from ${inquiry.email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send inquiry notification email for inquiry from ${inquiry.email}`,
        error,
      );
    }

    return createdInquiry;
  }

  private buildInquiryNotificationEmail(inquiry: InquiryCreateDto): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; margin-top: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #0066cc; }
            .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #0066cc; }
            .footer { margin-top: 20px; padding: 10px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Yeni İletişim Formu Mesajı</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Konu:</div>
                <div class="value">${this.escapeHtml(inquiry.subject)}</div>
              </div>
              <div class="field">
                <div class="label">Ad Soyad:</div>
                <div class="value">${this.escapeHtml(inquiry.fullName)}</div>
              </div>
              <div class="field">
                <div class="label">E-posta:</div>
                <div class="value">${this.escapeHtml(inquiry.email)}</div>
              </div>
              <div class="field">
                <div class="label">Telefon:</div>
                <div class="value">${this.escapeHtml(inquiry.phone)}</div>
              </div>
              <div class="field">
                <div class="label">Mesaj:</div>
                <div class="value">${this.escapeHtml(inquiry.message).replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>Bu e-posta Ocean Waves iletişim formu sisteminden otomatik olarak gönderilmiştir.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private buildInquiryNotificationEmailText(inquiry: InquiryCreateDto): string {
    return `
Yeni İletişim Formu Mesajı

Konu: ${inquiry.subject}
Ad Soyad: ${inquiry.fullName}
E-posta: ${inquiry.email}
Telefon: ${inquiry.phone}

Mesaj:
${inquiry.message}

---
Bu e-posta Ocean Waves iletişim formu sisteminden otomatik olarak gönderilmiştir.
    `.trim();
  }

  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  }

  async getInquiries() {
    return this.inquiryRepository.findMany();
  }

  async deleteInquiry(ids: string[]) {
    return this.inquiryRepository.deleteMany({ id: { in: ids } });
  } 
}