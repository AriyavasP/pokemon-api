import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDto, LoginDto } from 'src/common/interfaces/user/user.dto';
import { IUserBaseController } from 'src/common/interfaces/base/base.user.interface.controller';
import { IHttpResponse } from 'src/common/utils/resposne.utils';
import { IUserBaseService } from 'src/common/interfaces/base/base.user.interface.service';

@Controller('api/v1/user')
export class UserController implements IUserBaseController {
  constructor(
    @Inject('IUserBaseService')
    private readonly userService: IUserBaseService,
  ) {}

  @Post('register')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IHttpResponse> {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }

  @Post('login')
  async login(@Body() body: LoginDto): Promise<IHttpResponse> {
    const decode = await this.userService.loginUser(body);
    return decode;
  }
}
