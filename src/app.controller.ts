import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  getLoginUser(@Request() req): any {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  getHello(@Request() req): string {
    return req.user;
  }
}
