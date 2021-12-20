import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { MeterDto } from '@dto/meter/meter.dto';
import { MeterService } from '../../services/meters/meter.service';

@Controller('meter')
export class MeterController {
  constructor(private readonly meterService: MeterService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  public async createMeter(@Body() meter: MeterDto) {
    return this.meterService.createMeter(meter);
  }
}
