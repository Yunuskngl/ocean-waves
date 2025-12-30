import { Injectable } from '@nestjs/common';
import { Prisma, Inquiry } from 'generated/prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { BaseRepository } from '../base/base.repository';

@Injectable()
export class InquiryRepository extends BaseRepository<
  Inquiry,
  Prisma.InquiryWhereUniqueInput,
  Prisma.InquiryWhereInput,
  Prisma.InquiryCreateInput,
  Prisma.InquiryUpdateInput,
  Prisma.InquiryOrderByWithRelationInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'inquiry');
  }
}
