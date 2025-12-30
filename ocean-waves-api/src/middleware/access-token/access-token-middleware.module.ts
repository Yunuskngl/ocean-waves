import { Module } from '@nestjs/common';
import { TokenLifecycleModule } from 'src/service/token-lifecycle/token-lifecycle.module';
import { AccessTokenAuthGuard } from './access-token.guard';

@Module({
  imports: [TokenLifecycleModule],
  providers: [AccessTokenAuthGuard],
  exports: [AccessTokenAuthGuard, TokenLifecycleModule],
})
export class AccessTokenMiddlewareModule {}
