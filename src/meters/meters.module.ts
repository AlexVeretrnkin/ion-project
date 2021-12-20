import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meter } from '@entities/meter.entity';
import { MeterService } from './services/meters/meter.service';
import { MeterController } from './controllers/meter/meter.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Meter])],
  providers: [MeterService],
  controllers: [MeterController],
})
export class MetersModule {}
