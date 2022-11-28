import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(
    firstName: string,
    password: string,
  ): Promise<object | null> {
    const user = await this.userService.getUserByFirstName(firstName);
    console.log(user);

    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}
