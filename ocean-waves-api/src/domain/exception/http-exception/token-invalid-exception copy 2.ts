import { HttpStatusCode } from 'src/domain/enums/Http-Status-Code';
import { BaseException } from './exception';

export class TokenInvalidException extends BaseException {
  constructor() {
    super({
      message: 'Token is invalid',
      code: 'TOKEN_INVALID',
      statusCode: HttpStatusCode.UNAUTHORIZED,
    });
  }
}
