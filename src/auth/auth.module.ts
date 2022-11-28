import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  providers: [AuthService, LocalStrategy, SessionSerializer],
  imports: [UsersModule, PassportModule.register({ session: true })],
})
export class AuthModule {}
