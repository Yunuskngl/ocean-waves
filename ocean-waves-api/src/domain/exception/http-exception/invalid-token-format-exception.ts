import { HttpStatusCode } from '../../enums/Http-Status-Code';
import { BaseException } from './exception';

export class InvalidTokenFormatException extends BaseException {
  constructor() {
    super({
      message: 'Invalid token format. Expected format: Bearer <token>',
      code: 'INVALID_TOKEN_FORMAT',
      statusCode: HttpStatusCode.UNAUTHORIZED,
    });
  }
}
