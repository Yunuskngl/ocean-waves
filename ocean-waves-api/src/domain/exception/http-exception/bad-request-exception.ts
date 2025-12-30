import { BaseException } from "./exception";
import { HttpStatusCode } from "../../enums/Http-Status-Code";

export class BadRequestException extends BaseException {
  constructor() {
    super({
      message: 'Bad request',
      code: 'BAD_REQUEST',
      statusCode: HttpStatusCode.BAD_REQUEST,
    });
  }  
}