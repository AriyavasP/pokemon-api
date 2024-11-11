import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;

    const requestBody = req.body;
    this.logger.log(`Request Body: ${JSON.stringify(requestBody)}`, 'HTTP');

    return next.handle().pipe(
      tap((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        this.logger.log(
          `${method} ${url} ${statusCode} - Response Body: ${JSON.stringify(data)}`,
          'HTTP',
        );
      }),
    );
  }
}
