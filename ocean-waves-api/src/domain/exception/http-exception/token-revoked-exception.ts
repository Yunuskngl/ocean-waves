import { HttpStatusCode } from 'src/domain/enums/Http-Status-Code';
import { BaseException } from './exception';

export class TokenRevokedException extends BaseException {
  constructor() {
    super({
      message: 'Token has been revoked',
      code: 'TOKEN_REVOKED',
      statusCode: HttpStatusCode.UNAUTHORIZED,
    });
  }
}
