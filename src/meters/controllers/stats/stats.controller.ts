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
  import { PaginationQueryModel } from '@models/query/pagination-query.model';
  import { ReadingService } from '../../services/reading/reading.service';
  import { ReadingDto } from '@dto/meter/reading.dto';
  import { ReadingQueryModel } from "@models/query/reading-query.model";
  import { MeterQueryModel } from "@models/query/meter-query.model";
  import { Public } from 'src/auth/decorators/public.decorator';
  import { ReadingUploadModel } from '@models/query/reading-upload.model';
import { DateRangeQueryModel } from '@models/query/date-range-query.model';
import { StatsService } from 'src/meters/services/stats/stats.service';
import { MeterConsumptionQuery } from '@models/query/meter-consumption-query.model';
  
  @Controller('stats')
  export class StatsController {
    constructor(
      private readonly statsService: StatsService,
    ) {}
  
    @HttpCode(HttpStatus.OK)
    @Get('meterCount')
    public async getMeterCount() {
      return this.statsService.getMeterCount();
    }

    @HttpCode(HttpStatus.OK)
    @Get('readingsReceived')
    public async getReceivedReadingsCount(@Query() query: DateRangeQueryModel) {
        return this.statsService.getReceivedReadingCount(query);
    }

    @HttpCode(HttpStatus.OK)
    @Get('consumption')
    public async getReceivegetConsumptionForType(@Query() query: MeterConsumptionQuery) {
        return this.statsService.getConsumption(query);
    }
  }
  