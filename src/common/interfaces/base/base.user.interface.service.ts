import { CreateUserDto, LoginDto } from '../user/user.dto';
import { IHttpResponse } from 'src/common/utils/resposne.utils';

export interface IUserBaseService {
  createUser(createUserDto: CreateUserDto): Promise<IHttpResponse>;
  loginUser(body: LoginDto): Promise<IHttpResponse>;
}
