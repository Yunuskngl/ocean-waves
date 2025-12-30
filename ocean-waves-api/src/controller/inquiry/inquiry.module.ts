import { Module } from "@nestjs/common";
import { InquiryController } from "./inquiry.controller";
import { InquiryServiceModule } from "src/service/inquiry/inquiry.module";
import { AccessTokenMiddlewareModule } from "src/middleware/access-token/access-token-middleware.module";

@Module({
  imports: [InquiryServiceModule, AccessTokenMiddlewareModule],
  controllers: [InquiryController],
})
export class InquiryModule {}