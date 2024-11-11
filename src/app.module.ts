import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user/user.entity';
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filter/http-exception.filter';
import { ValidatePipe } from './common/pipe/validate.pipe';
import { TransformResponseInterceptor } from './common/interceptor/transformResponse.interceptor';
import { LoggingInterceptor } from './common/logging/logging.interceptor';
import { LoggerService } from './common/logging/logger.service';
import { AuthMiddleware } from './common/middleware/http-header.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRESS_HOST'),
        port: configService.get<number>('POSTGRESS_PORT'),
        username: configService.get<string>('POSTGRESS_USERNAME'),
        password: configService.get<string>('POSTGRESS_PASSWORD'),
        database: configService.get<string>('POSTGRESS_DATABASE'),
        entities: [UserEntity],
        synchronize: true,
      }),
    }),
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidatePipe(),
    },
    LoggerService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: 'api/v1/user/(.*)',
        method: RequestMethod.ALL,
      })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
