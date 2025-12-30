import { Injectable } from "@nestjs/common";
import { Product } from "generated/prisma/client";
import { ProductUpdateInput } from "generated/prisma/models";
import { ProductCreateDto } from "src/domain/dto/request/product-create.dto";
import { ProductUpdateDto } from "src/domain/dto/request/product-update.dto";
import { ProductRepository } from "src/repository/product/product.repository";

@Injectable()
export class ProductManagementService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(product: ProductCreateDto): Promise<Product> {
    return this.productRepository.create(product);
  }

  async getProducts(): Promise<Product[]> {
    return this.productRepository.findMany();
  }

  async updateProduct(id: string, product: ProductUpdateDto): Promise<Product> {
    return this.productRepository.updateOne({ id }, this.buildProductUpdateInput(product));
  }

  private buildProductUpdateInput(product: ProductUpdateDto): ProductUpdateInput {
    return {
      title: product.title ?? undefined,
      description: product.description ?? undefined,
      image: product.image ?? undefined,
      features: product.features ?? undefined,
    };
  }

  public async deleteProducts(ids: string[]): Promise<void> {
    await this.productRepository.deleteMany({ id: { in: ids } });
  }
}