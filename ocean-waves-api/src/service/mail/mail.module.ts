import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailConfig } from 'src/config/nodemailer.config';

@Module({
  providers: [MailService, MailConfig],
  exports: [MailService],
})
export class MailModule {}

