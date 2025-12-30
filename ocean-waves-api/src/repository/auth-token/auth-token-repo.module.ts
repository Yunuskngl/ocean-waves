import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { AuthTokenRepository } from './auth-token.repository';

@Module({
  imports: [PrismaModule],
  providers: [AuthTokenRepository],
  exports: [AuthTokenRepository],
})
export class AuthTokenRepoModule {}
