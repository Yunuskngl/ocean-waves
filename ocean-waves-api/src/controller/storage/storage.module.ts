import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageModule as StorageServiceModule } from 'src/service/storage/storage.module';
import { AccessTokenMiddlewareModule } from 'src/middleware/access-token/access-token-middleware.module';

@Module({
  imports: [StorageServiceModule, AccessTokenMiddlewareModule],
  controllers: [StorageController],
})
export class StorageControllerModule {}

