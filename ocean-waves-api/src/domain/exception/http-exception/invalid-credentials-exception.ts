import { HttpStatusCode } from '../../enums/Http-Status-Code';
import { BaseException } from './exception';

export class InvalidCredentialsException extends BaseException {
  constructor() {
    super({
      message: 'Invalid email or password',
      code: 'INVALID_CREDENTIALS',
      statusCode: HttpStatusCode.UNAUTHORIZED,
    });
  }
}
