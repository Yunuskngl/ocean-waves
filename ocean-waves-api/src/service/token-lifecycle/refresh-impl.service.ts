import { Inject, Injectable } from '@nestjs/common';
import { AuthTokenRepository } from 'src/repository/auth-token/auth-token.repository';
import { TOKEN_SERVICE, TokenService } from '../token/token-service';
import { TokenNotFoundException } from 'src/domain/exception/http-exception/token-not-found-exception';
import { TokenRevokedException } from 'src/domain/exception/http-exception/token-revoked-exception';
import { TokenExpiredException } from 'src/domain/exception/http-exception/token-expired-exception';
import { TokenInvalidException } from 'src/domain/exception/http-exception/token-invalid-exception';
import {
  GenerateTokenContext,
  InvalidateTokenRecord,
  TokenLifecycle,
  ValidateTokenRecord,
  GetTokenRecordOrThrow,
} from './token-lifecycle';
import { AuthToken, TokenType } from 'generated/prisma/client';

@Injectable()
export class RefreshTokenLifecycleService
  implements
    TokenLifecycle,
    ValidateTokenRecord,
    InvalidateTokenRecord,
    GetTokenRecordOrThrow<AuthToken>
{
  readonly type = TokenType.REFRESH;
  private readonly expirationMs = 30 * 24 * 60 * 60 * 1000;

  constructor(
    @Inject(TOKEN_SERVICE)
    private readonly tokenService: TokenService,
    private readonly authTokenRepository: AuthTokenRepository,
  ) {}

  async validateTokenRecord(token: string): Promise<void> {
    const record = await this.authTokenRepository.findByToken(token);
    console.log('Record found', record);
    if (!record) {
      throw new TokenNotFoundException();
    }
    if (record.type !== this.type) {
      throw new TokenInvalidException();
    }
    if (record.revoked) {
      throw new TokenRevokedException();
    }
    if (record.expiresAt.getTime() <= Date.now()) {
      throw new TokenExpiredException();
    }
  }


  async invalidateTokenRecord(token: string): Promise<void> {
    const record = await this.authTokenRepository.findByToken(token);    
    if (!record) {
      return;
    }
    if (record.type !== this.type) {
      throw new TokenInvalidException();
    }    
    const result = await this.authTokenRepository.deleteOne({ token });
  }

  async generateToken(context: GenerateTokenContext): Promise<string> {
    const jti = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    const claims = {
      userId: context.userId,
      email: context.email,
      tokenVersion: context.tokenVersion,
      type: this.type,
      jti,
    };
    
    const token = this.tokenService.generateToken({
      expirationMs: this.expirationMs,
      claims,
    });
    
    const expiresAt = new Date(Date.now() + this.expirationMs);
    
    await this.authTokenRepository.create({
      token,
      type: this.type,
      expiresAt,
      userId: context.userId,
    });
    
    return token;
  }

  parseToken<TPayload = any>(token: string): TPayload {
    try {
      const payload = this.tokenService.parseToken(token) as { type?: unknown };
      if (
        typeof payload !== 'object' ||
        payload === null ||
        payload.type !== this.type
      ) {
        throw new TokenInvalidException();
      }
      return payload as TPayload;
    } catch {
      throw new TokenInvalidException();
    }
  }

  async getTokenRecordOrThrow(token: string): Promise<AuthToken> {
    const record = await this.authTokenRepository.findByToken(token);
    if (!record) {
      throw new TokenNotFoundException();
    }
    return record;
  }
}
