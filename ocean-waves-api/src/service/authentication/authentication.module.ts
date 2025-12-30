import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserRepoModule } from 'src/repository/user/user-repo.module';
import { TokenLifecycleModule } from '../token-lifecycle/token-lifecycle.module';

@Module({
  imports: [UserRepoModule, TokenLifecycleModule],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationServiceModule {}
