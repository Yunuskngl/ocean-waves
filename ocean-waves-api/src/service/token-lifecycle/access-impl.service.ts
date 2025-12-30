import { Inject, Injectable } from '@nestjs/common';
import { TOKEN_SERVICE, TokenService } from '../token/token-service';
import { TokenInvalidException } from 'src/domain/exception/http-exception/token-invalid-exception';
import { TokenExpiredException } from 'src/domain/exception/http-exception/token-expired-exception';
import {
  GenerateTokenContext,
  TokenLifecycle,
  ValidateTokenPayload,
} from './token-lifecycle';
import { TokenExpiredError } from 'jsonwebtoken';
import { TokenType } from 'generated/prisma/enums';

@Injectable()
export class AccessTokenLifecycleService
  implements TokenLifecycle, ValidateTokenPayload
{
  readonly type = TokenType.ACCESS;
  private readonly expirationMs = 15 * 60 * 1000;

  constructor(
    @Inject(TOKEN_SERVICE)
    private readonly tokenService: TokenService,
  ) {}

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
    return token;
  }

  async validateTokenPayload(token: string): Promise<{
    userId: string;
    email?: string;
    role?: string;
    tokenVersion?: number;
    type: TokenType;
  }> {
    let payload: {
      userId?: unknown;
      email?: unknown;
      role?: unknown;
      tokenVersion?: unknown;
      type?: unknown;
    };

    try {
      payload = this.tokenService.parseToken(token) as {
        userId?: unknown;
        email?: unknown;
        role?: unknown;
        tokenVersion?: unknown;
        type?: unknown;
      };
    } catch (error) {
      return this.handleParseError(error);
    }

    if (
      typeof payload !== 'object' ||
      payload === null ||
      typeof payload.userId !== 'string' ||
      (payload.email !== undefined && typeof payload.email !== 'string') ||
      (payload.role !== undefined && typeof payload.role !== 'string') ||
      (payload.tokenVersion !== undefined &&
        typeof payload.tokenVersion !== 'number') ||
      payload.type !== this.type
    ) {
      throw new TokenInvalidException();
    }
    return {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      tokenVersion: payload.tokenVersion,
      type: payload.type as TokenType,
    };
  }

  parseToken<TPayload = any>(token: string): TPayload {
    try {
      const payload = this.tokenService.parseToken(token) as {
        userId?: unknown;
        email?: unknown;
        role?: unknown;
        tokenVersion?: unknown;
        type?: unknown;
      };
      if (
        typeof payload !== 'object' ||
        payload === null ||
        typeof payload.userId !== 'string' ||
        (payload.email !== undefined && typeof payload.email !== 'string') ||
        (payload.role !== undefined && typeof payload.role !== 'string') ||
        (payload.tokenVersion !== undefined &&
          typeof payload.tokenVersion !== 'number') ||
        payload.type !== this.type
      ) {
        throw new TokenInvalidException();
      }
      return payload as TPayload;
    } catch (error) {
      return this.handleParseError(error);
    }
  }

  private handleParseError(error: unknown): never {
    if (
      error instanceof TokenExpiredError ||
      (typeof error === 'object' &&
        error !== null &&
        (error as any).name === 'TokenExpiredError')
    ) {
      throw new TokenExpiredException();
    }
    throw new TokenInvalidException();
  }
}
