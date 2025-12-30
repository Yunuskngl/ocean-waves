import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ProductCreateDto } from "src/domain/dto/request/product-create.dto";
import { ProductUpdateDto } from "src/domain/dto/request/product-update.dto";
import { AccessTokenAuthGuard } from "src/middleware/access-token/access-token.guard";
import { Public } from "src/middleware/access-token/public.decorator";
import { ProductManagementService } from "src/service/product-management/product-management.service";

@Controller('product-management')
@UseGuards(AccessTokenAuthGuard)
export class ProductManagementController {
  constructor(private readonly productManagementService: ProductManagementService) {}

  @Post('create')
  async createProduct(@Body() product: ProductCreateDto) {
    return this.productManagementService.createProduct(product);
  }
  
  @Public()
  @Get('get-products')
  async getProducts() {
    return this.productManagementService.getProducts();
  }

  @Put('update/:id')
  async updateProduct(@Body() product: ProductUpdateDto, @Param('id') id: string) {
    return this.productManagementService.updateProduct(id, product);
  }

  @Delete('delete')
  async deleteProduct(@Body() products: string[]) {
    return this.productManagementService.deleteProducts(products);
  }
}
