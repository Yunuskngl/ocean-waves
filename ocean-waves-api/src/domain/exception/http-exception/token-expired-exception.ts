import { HttpStatusCode } from 'src/domain/enums/Http-Status-Code';
import { BaseException } from './exception';

export class TokenExpiredException extends BaseException {
  constructor() {
    super({
      message: 'Token has expired',
      code: 'TOKEN_EXPIRED',
      statusCode: HttpStatusCode.UNAUTHORIZED,
    });
  }
}
