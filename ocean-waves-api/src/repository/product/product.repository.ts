import { Injectable } from '@nestjs/common';
import { Prisma, Product } from 'generated/prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { BaseRepository } from '../base/base.repository';

@Injectable()
export class ProductRepository extends BaseRepository<
  Product,
  Prisma.ProductWhereUniqueInput,
  Prisma.ProductWhereInput,
  Prisma.ProductCreateInput,
  Prisma.ProductUpdateInput,
  Prisma.ProductOrderByWithRelationInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'product');
  }
}
