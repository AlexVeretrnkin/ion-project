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
  
  @Controller('reading')
  export class ReadingController {
    constructor(
      private readonly meterService: MeterService,
      private readonly readingService: ReadingService,
    ) {}
  
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('')
    public async uploadReadings(@Body() data: ReadingUploadModel) {
      return this.readingService.uploadReadings(data);
    }
  
  }
  