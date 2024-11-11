import { IsString, IsBoolean, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 255)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 255)
  password: string;
}

export class UserDto {
  id: number;

  @IsString()
  username: string;

  @IsBoolean()
  isActive: boolean;

  createdTimestamp: Date;
  updatedTimestamp: Date;
}

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
