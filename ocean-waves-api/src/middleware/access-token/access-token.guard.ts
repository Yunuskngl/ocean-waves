import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AccessTokenLifecycleService } from 'src/service/token-lifecycle/access-impl.service';
import { TokenType } from 'generated/prisma/client';
import { TokenInvalidException } from 'src/domain/exception/http-exception/token-invalid-exception';
import { IS_PUBLIC_KEY } from './public.decorator';
import { MissingAuthorizationHeaderException } from 'src/domain/exception/http-exception/missing-authorization-header-exception';
import { InvalidTokenFormatException } from 'src/domain/exception/http-exception/invalid-token-format-exception';
import { InvalidAuthorizationSchemeException } from 'src/domain/exception/http-exception/invalid-authorization-scheme-exception';
import { AccessTokenDTO } from 'src/domain/dto/access-token.dto';

@Injectable()
export class AccessTokenAuthGuard implements CanActivate {
  constructor(
    private readonly accessTokenLifecycleService: AccessTokenLifecycleService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const req = context.switchToHttp().getRequest<Request>();
    const token = this.extractBearerToken(req);
    const payload = this.parseAccessToken(token);
    this.validateAccessTokenType(payload);
    req.accessToken = token;
    req.accessTokenPayload = payload;
    return true;
  }

  private extractBearerToken(req: Request): string {
    const authHeader = req.headers['authorization'];
    if (!authHeader || typeof authHeader !== 'string') {
      throw new MissingAuthorizationHeaderException();
    }
    const [scheme, token] = authHeader.split(' ');
    if (!scheme || !token) {
      throw new InvalidTokenFormatException();
    }
    if (scheme.toLowerCase() !== 'bearer') {
      throw new InvalidAuthorizationSchemeException();
    }
    return token;
  }

  private parseAccessToken(accessToken: string): AccessTokenDTO {
    return this.accessTokenLifecycleService.parseToken(accessToken);
  }

  private validateAccessTokenType(accessTokenPayload: AccessTokenDTO): void {
    if (accessTokenPayload.type !== TokenType.ACCESS) {
      throw new TokenInvalidException();
    }
  }
}
