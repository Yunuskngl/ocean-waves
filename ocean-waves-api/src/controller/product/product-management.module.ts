import { Module } from "@nestjs/common";
import { ProductManagementController } from "./product-management.controller";
import { ProductManagementServiceModule } from "src/service/product-management/product-management-service.module";
import { AccessTokenMiddlewareModule } from "src/middleware/access-token/access-token-middleware.module";

@Module({
  imports: [ProductManagementServiceModule, AccessTokenMiddlewareModule],
  controllers: [ProductManagementController],
})
export class ProductManagementModule {}
