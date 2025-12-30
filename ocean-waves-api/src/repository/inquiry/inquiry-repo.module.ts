import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { InquiryRepository } from './inquiry.repository';

@Module({
  imports: [PrismaModule],
  providers: [InquiryRepository],
  exports: [InquiryRepository],
})
export class InquiryRepoModule {}
