import { Module } from '@nestjs/common';
import { TOKEN_SERVICE } from './token-service';
import { JwtTokenService } from './jwt-impl.service';

@Module({
  providers: [
    {
      provide: TOKEN_SERVICE,
      useClass: JwtTokenService,
    },
  ],
  exports: [TOKEN_SERVICE],
})
export class TokenModule {}
