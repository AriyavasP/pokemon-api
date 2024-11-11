import { CreateUserDto, LoginDto } from '../user/user.dto';
import { IHttpResponse } from 'src/common/utils/resposne.utils';

export interface IUserBaseController {
  createUser(createUserDto: CreateUserDto): Promise<IHttpResponse>;
  login(body: LoginDto): Promise<IHttpResponse>;
}
