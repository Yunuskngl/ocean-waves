import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationServiceModule } from 'src/service/authentication/authentication.module';

@Module({
  imports: [AuthenticationServiceModule],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
