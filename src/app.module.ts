import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PersistenceModule } from './persistence/persistence.module';
import { MetersModule } from './meters/meters.module';

@Module({
  imports: [AuthModule, UsersModule, PersistenceModule, MetersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
