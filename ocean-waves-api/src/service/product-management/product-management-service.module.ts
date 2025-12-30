import { Module } from "@nestjs/common";
import { ProductManagementService } from "./product-management.service";
import { ProductRepoModule } from "src/repository/product/product-repo.module";

@Module({
  imports: [ProductRepoModule],
  providers: [ProductManagementService],
  exports: [ProductManagementService],
})
export class ProductManagementServiceModule {}