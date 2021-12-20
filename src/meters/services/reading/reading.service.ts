import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DeleteResult, InsertResult, Repository } from 'typeorm';
import { PaginationModel } from '@models/pagination.model';
import { Reading } from '@entities/reading.entity';
import { ReadingDto } from '@dto/meter/reading.dto';
import { ReadingQueryModel } from '@models/query/reading-query.model';

@Injectable()
export class ReadingService {
  constructor(
    @InjectRepository(Reading)
    private readonly readingRepository: Repository<Reading>,
  ) {}

  public createReading(reading: ReadingDto): Promise<InsertResult> {
    return this.readingRepository.insert(reading);
  }

  public deleteReading(id: string): Promise<DeleteResult> {
    return this.readingRepository.delete({ id });
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
