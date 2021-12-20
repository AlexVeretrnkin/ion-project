import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meter } from '@entities/meter.entity';
import { MeterService } from './services/meters/meter.service';
import { MeterController } from './controllers/meter/meter.controller';
import { Reading } from '@entities/reading.entity';
import { ReadingService } from './services/reading/reading.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meter, Reading])],
  providers: [MeterService, ReadingService],
  controllers: [MeterController],
})
export class MetersModule {}
