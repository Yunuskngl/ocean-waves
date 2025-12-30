import { HttpStatusCode } from 'src/domain/enums/Http-Status-Code';
import { BaseException } from './exception';

export class UserAlreadyExistsException extends BaseException {
  constructor(email: string) {
    super({
      message: `User with email '${email}' already exists`,
      code: 'USER_ALREADY_EXISTS',
      statusCode: HttpStatusCode.CONFLICT,
      details: { email },
    });
  }
}
