import { ArgumentsHost, Catch, ExceptionFilter, Injectable } from "@nestjs/common";
import { ApplicationException } from "src/domain/exception/application-exception/base-exception";

@Catch(ApplicationException)
export class ApplicationExceptionFilter implements ExceptionFilter {
    catch(exception: ApplicationException, host: ArgumentsHost) {
        console.error('Application Error:', exception);
        process.emit('uncaughtException', exception);
    }
}
