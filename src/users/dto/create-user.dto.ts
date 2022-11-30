import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  id: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  description: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  mobile: string;

  @IsNotEmpty()
  @Length(4, 30)
  password: string;

  @IsNotEmpty()
  @Length(4, 30)
  confirmPassword: string;
}
