import { HttpStatusCode } from '../../enums/Http-Status-Code';
import { BaseException } from './exception';

export class MissingAuthorizationHeaderException extends BaseException {
  constructor() {
    super({
      message: 'Authorization header is missing or invalid',
      code: 'MISSING_AUTHORIZATION_HEADER',
      statusCode: HttpStatusCode.UNAUTHORIZED,
    });
  }
}
