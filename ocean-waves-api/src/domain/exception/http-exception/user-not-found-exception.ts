import { HttpStatusCode } from "src/domain/enums/Http-Status-Code";
import { BaseException } from "./exception";

export class UserNotFoundException extends BaseException {
  constructor() {
    super({
      message: 'User not found',
      code: 'USER_NOT_FOUND',
      statusCode: HttpStatusCode.NOT_FOUND,
    });
  }
}