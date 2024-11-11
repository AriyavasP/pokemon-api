import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/auth/strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { algorithm: 'HS512' },
      }),
    }),
  ],
  providers: [
    {
      provide: 'IUserBaseService',
      useClass: UserService,
    },
    UserRepository,
    JwtStrategy,
    {
      provide: 'IUserBaseController',
      useClass: UserController,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
