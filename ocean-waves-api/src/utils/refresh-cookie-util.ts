import { CookieDefinition } from 'src/domain/dto/cookie-definition.dto';
import { InvalidParameterException } from 'src/domain/exception/http-exception/invalid-parameter';
import { TokenInvalidException } from 'src/domain/exception/http-exception/token-invalid-exception';

const REFRESH_TOKEN_COOKIE_NAME = 'refreshToken';
const REFRESH_TOKEN_COOKIE_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30;

export class CookieUtil {
  static createRefreshTokenCookie(refreshToken: string): CookieDefinition {
    return {
      name: REFRESH_TOKEN_COOKIE_NAME,
      value: refreshToken,
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: REFRESH_TOKEN_COOKIE_MAX_AGE_MS,
      },
    };
  }

  static clearRefreshTokenCookie(): CookieDefinition {
    return {
      name: REFRESH_TOKEN_COOKIE_NAME,
      value: '',
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
        sameSite: 'strict',
        path: '/',
        maxAge: 0,
      },
    };
  }

  static extractRefreshTokenFromCookies(
    cookies: Record<string, string> | undefined,
  ): string {
    if (!cookies) throw new InvalidParameterException();
    if (!cookies[REFRESH_TOKEN_COOKIE_NAME]) throw new TokenInvalidException();
    return cookies[REFRESH_TOKEN_COOKIE_NAME];
  }
}
