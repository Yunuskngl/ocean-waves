import { HttpStatusCode } from 'src/domain/enums/Http-Status-Code';
import { BaseException } from './exception';

export class InvalidParameterException extends BaseException {
  constructor() {
    super({
      message: `Invalid Parameter`,
      code: 'INVALID_PARAMETERS',
      statusCode: HttpStatusCode.BAD_REQUEST,
      details: {},
    });
  }
}
