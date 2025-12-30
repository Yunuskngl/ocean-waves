import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { ProductRepository } from './product.repository';

@Module({
  imports: [PrismaModule],
  providers: [ProductRepository],
  exports: [ProductRepository],
})
export class ProductRepoModule {}

