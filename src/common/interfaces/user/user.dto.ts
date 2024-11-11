import {
  IsString,
  IsOptional,
  IsBoolean,
  Length,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 255)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 255)
  password: string;

  @IsOptional()
  @IsEmail()
  @Length(4, 255)
  email?: string;
}

export class UserDto {
  id: number;

  @IsString()
  username: string;

  @IsOptional()
  @IsEmail()
  email?: string;

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
