import { HttpStatusCode } from 'src/domain/enums/Http-Status-Code';
import { BaseException } from './exception';

export class TokenNotFoundException extends BaseException {
  constructor() {
    super({
      message: 'Token not found',
      code: 'TOKEN_NOT_FOUND',
      statusCode: HttpStatusCode.UNAUTHORIZED,
    });
  }
}
