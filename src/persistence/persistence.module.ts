import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@entities/user.entity';
import { Meter } from '@entities/meter.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1111',
      database: 'iot',
      entities: [UserEntity, Meter],
      synchronize: true,
    }),
  ],
  exports: [PersistenceModule],
})
export class PersistenceModule {}
