import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ExpensesModule } from './expenses/expenses.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'doadmin',
      password: 'AVNS_s2HzDa7DRdG6STeSOPT',
      database: 'myExpenseTracker',
      host: 'game8839-db-do-user-12706938-0.b.db.ondigitalocean.com',
      port: 25060,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ExpensesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
