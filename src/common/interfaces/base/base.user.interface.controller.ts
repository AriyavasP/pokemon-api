import { ITokenBaseModel } from '../token/token.interface';
import { CreateUserDto, LoginDto } from '../user/user.dto';
import { IHttpResponse } from 'src/common/utils/resposne.utils';

export interface IUserBaseController {
  createUser(createUserDto: CreateUserDto): Promise<IHttpResponse>;
  login(body: LoginDto, token: ITokenBaseModel): Promise<IHttpResponse>;
}
