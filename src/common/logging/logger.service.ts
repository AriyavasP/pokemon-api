import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import * as winston from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  private logger: winston.Logger;

  constructor(context?: string) {
    super(context);

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      defaultMeta: { service: 'service' },
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
    super.log(message, context);
  }

  error(message: string, trace: string, context?: string) {
    this.logger.error(message, { context, trace });
    super.error(message, trace, context);
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
    super.warn(message, context);
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
    super.debug(message, context);
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context });
    super.verbose(message, context);
  }
}
