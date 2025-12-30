import { Module } from '@nestjs/common';
import { AccessTokenLifecycleService } from './access-impl.service';
import { RefreshTokenLifecycleService } from './refresh-impl.service';
import { AuthTokenRepoModule } from 'src/repository/auth-token/auth-token-repo.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [AuthTokenRepoModule, TokenModule],
  providers: [
    AccessTokenLifecycleService,
    RefreshTokenLifecycleService,
  ],
  exports: [
    AccessTokenLifecycleService,
    RefreshTokenLifecycleService,
  ],
})
export class TokenLifecycleModule {}
