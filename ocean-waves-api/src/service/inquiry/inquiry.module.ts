import { Module } from "@nestjs/common";
import { InquiryService } from "./inquiry.service";
import { InquiryRepoModule } from "src/repository/inquiry/inquiry-repo.module";
import { MailModule } from "../mail/mail.module";

@Module({
  imports: [InquiryRepoModule, MailModule],
  providers: [InquiryService],
  exports: [InquiryService],
})
export class InquiryServiceModule {}