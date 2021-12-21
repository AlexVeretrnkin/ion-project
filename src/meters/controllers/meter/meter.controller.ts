import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MeterDto } from '@dto/meter/meter.dto';
import { MeterService } from '../../services/meters/meter.service';
import { ReadingService } from '../../services/reading/reading.service';
import { ReadingDto } from '@dto/meter/reading.dto';
import { ReadingQueryModel } from '@models/query/reading-query.model';
import { MeterQueryModel } from '@models/query/meter-query.model';
import { Public } from 'src/auth/decorators/public.decorator';
import { ReadingUploadModel } from '@models/query/reading-upload.model';

@Controller('meter')
export class MeterController {
  constructor(
    private readonly meterService: MeterService,
    private readonly readingService: ReadingService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  public async createMeter(@Body() meter: MeterDto) {
    return this.meterService.createMeter(meter);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  public async getMeters(@Query() query: MeterQueryModel) {
    return this.meterService.getAllMeters(query);
  }

  @HttpCode(HttpStatus.OK)
  @Patch()
  public async updateMeter(@Body() meter: MeterDto) {
    return this.meterService.updateMeter(meter);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async deleteMeter(@Param() params) {
    return this.meterService.deleteMeter(params.id);
  }

  @HttpCode(HttpStatus.OK)
  @Get('count')
  public async getMeterCount() {
    return this.meterService.getMeterCount();
  }

  @HttpCode(HttpStatus.OK)
  @Post('reading')
  public async createReading(@Body() reading: ReadingDto) {
    return this.readingService.createReading(reading);
  }

  @HttpCode(HttpStatus.OK)
  @Get('reading')
  public async getReadings(@Query() query: ReadingQueryModel) {
    return this.readingService.getAllReadingsByMeter(query);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('reading/:id')
  public async deleteReading(@Param() params) {
    return this.readingService.deleteReading(params.id);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('readings')
  public async uploadReadings(@Body() data: ReadingUploadModel) {
    return this.readingService.uploadReadings(data);
  }
}
