import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    firstName: string,
    password: string,
  ): Promise<object | null> {
    const user = await this.userService.getUserByFirstName(firstName);

    console.log(firstName);
    console.log(password);
    console.log(user);

    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { firstName: user.firstName, sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }
}
