import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseException } from 'src/domain/exception/http-exception/exception';

//TODO: later make the error responses compliant with JSend standards
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    if (exception instanceof BaseException) {
      return res.status(exception.statusCode).json({
        error: {
          message: exception.message,
          code: exception.code,
          details: exception.details,
        },
      });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();
      return res.status(status).json({
        error: {
          message: (response as any).message || 'HTTP_EXCEPTION',
          details: (response as any).details || {},
          code: (response as any).error || 'HTTP_EXCEPTION',
        },
      });
    }


    console.error(exception);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });
  }
}
