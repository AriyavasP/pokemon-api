import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import {
  CreateUserDto,
  LoginDto,
  UserDto,
} from '../common/interfaces/user/user.dto';
import { UserEntity } from 'src/entity/user/user.entity';
import { IUserBaseService } from 'src/common/interfaces/base/base.user.interface.service';
import { IHttpResponse, ResponseUtils } from 'src/common/utils/resposne.utils';
import { JwtService } from '@nestjs/jwt';
import { ITokenBaseModel } from 'src/common/interfaces/token/token.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService implements IUserBaseService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async createUser(createUserDto: CreateUserDto): Promise<IHttpResponse> {
    try {
      const existingUser = await this.userRepository.findByUsername(
        createUserDto.username,
      );
      if (existingUser) {
        return ResponseUtils.BadRequestResponse('Username already exists');
      }

      const hashedPassword = await this.hashPassword(createUserDto.password);

      const user = new UserEntity();
      user.username = createUserDto.username;
      user.password = hashedPassword;

      const savedUser = await this.userRepository.createUser(user);

      return ResponseUtils.Reponse(savedUser, 200);
    } catch (error) {
      throw ResponseUtils.InternalErrorResponse(error);
    }
  }

  private async validateUserPassword(
    username: string,
    password: string,
  ): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async loginUser(body: LoginDto): Promise<IHttpResponse> {
    try {
      const user: UserDto = await this.validateUserPassword(
        body.username,
        body.password,
      );

      if (!user) {
        return ResponseUtils.BadRequestResponse(
          'Username or Password Invalid.',
        );
      }

      const payload: ITokenBaseModel = {
        sub: user.id,
        username: user.username,
        isActive: user.isActive,
      };

      const token: string = await this.generateToken(payload);
      const refesh: string = await this.generateRefreshToken(payload);

      const data = {
        accessToken: token,
        refeshToken: refesh,
      };

      return ResponseUtils.Reponse(data, 200);
    } catch (error) {
      return ResponseUtils.InternalErrorResponse(error);
    }
  }

  private async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, {
      expiresIn: '30m',
    });
  }

  private async generateRefreshToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
  }
}
