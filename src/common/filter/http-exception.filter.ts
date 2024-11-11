import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    let message: string | object;

    // Check if the exception is an instance of HttpException
    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      // If exceptionResponse is an object, extract its message property
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        message = (exceptionResponse as any).message || exceptionResponse;
      } else {
        message = exceptionResponse;
      }
    } else {
      message = 'Internal server error';
    }

    const responseBody = {
      status: status,
      code: status.toString(),
      message: message,
    };

    this.logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(responseBody),
      exception instanceof Error ? exception.stack : '',
    );

    response.status(status).json(responseBody);
  }
}