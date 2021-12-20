import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meter } from '@entities/meter.entity';
import { InsertResult, Repository } from 'typeorm';
import { MeterDto } from '@dto/meter/meter.dto';

@Injectable()
export class MeterService {
  constructor(
    @InjectRepository(Meter)
    private readonly meterRepository: Repository<Meter>,
  ) {}

  public createMeter(meter: MeterDto): Promise<InsertResult> {
    return this.meterRepository.insert(meter);
  }
}
