import { Body, Controller, Delete, Post, UseGuards } from "@nestjs/common";
import { InquiryCreateDto } from "src/domain/dto/request/inquiry-create.dto";
import { AccessTokenAuthGuard } from "src/middleware/access-token/access-token.guard";
import { Public } from "src/middleware/access-token/public.decorator";
import { InquiryService } from "src/service/inquiry/inquiry.service";

@Controller('inquiry')
@UseGuards(AccessTokenAuthGuard)
export class InquiryController {
  constructor(private readonly inquiryService:InquiryService) {}

  @Post('create-inquiry')
  @Public()
  async createInquiry(@Body() inquiry: InquiryCreateDto) {
    return this.inquiryService.createInquiry(inquiry);
  }

  @Post('get-inquiries')
  async getInquiries() {
    return this.inquiryService.getInquiries();
  }

  @Delete('delete-inquiries')
  async deleteInquiry(@Body() ids: string[]) {
    return this.inquiryService.deleteInquiry(ids);
  }
}
