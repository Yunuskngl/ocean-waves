import { HttpStatusCode } from '../../enums/Http-Status-Code';
import { BaseException } from './exception';

export class InvalidAuthorizationSchemeException extends BaseException {
  constructor() {
    super({
      message: 'Invalid authorization scheme. Expected Bearer scheme',
      code: 'INVALID_AUTHORIZATION_SCHEME',
      statusCode: HttpStatusCode.UNAUTHORIZED,
    });
  }
}
