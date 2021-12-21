import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DeleteResult, InsertResult, Repository } from 'typeorm';
import { PaginationModel } from '@models/pagination.model';
import { Reading } from '@entities/reading.entity';
import { ReadingDto } from '@dto/meter/reading.dto';
import { ReadingQueryModel } from '@models/query/reading-query.model';
import { ReadingUploadModel } from '@models/query/reading-upload.model';
import { Meter } from '@entities/meter.entity';

@Injectable()
export class ReadingService {
  constructor(
    @InjectRepository(Reading)
    private readonly readingRepository: Repository<Reading>,
    @InjectRepository(Meter)
    private readonly meterRepository: Repository<Meter>,
  ) {}

  public createReading(reading: ReadingDto): Promise<InsertResult> {
    return this.readingRepository.insert(reading);
  }

  public deleteReading(id: string): Promise<DeleteResult> {
    return this.readingRepository.delete({ id });
  }

  public async uploadReadings(data: ReadingUploadModel): Promise<InsertResult> {
    let meter = await this.meterRepository.findOne({where: {key: data.meterKey}})
    if (meter == null) {
      console.log("Meter is", meter, data)
      throw new NotFoundException()
    }
    let meterId = meter.id
    return await this.readingRepository.insert(
      data.readings.map(r => ({meterId: meterId, date: r.date, value: r.value} as ReadingDto))
      )
  }

  public getReceivedReadingCount(from: Date, to: Date) {
      
  }

  public async getAllReadingsByMeter(
    query: ReadingQueryModel,
  ): Promise<PaginationModel<Reading>> {
    const { page, offset, meterId, from, to } = query;

    const [result, totalCount] = await this.readingRepository.findAndCount({
      where: {
        meterId,
        ...(!!from && !!to ? { date: Between(from, to) } : {}),
      },
      take: offset,
      skip: page * offset,
    });

    return {
      data: result,
      page,
      offset,
      totalCount,
    };
  }
}
