import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meter } from '@entities/meter.entity';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';
import { MeterDto } from '@dto/meter/meter.dto';
import { PaginationModel } from '@models/pagination.model';
import { MeterQueryModel } from '@models/query/meter-query.model';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';

@Injectable()
export class MeterService {
  constructor(
    @InjectRepository(Meter)
    private readonly meterRepository: Repository<Meter>,
  ) {}

  public createMeter(meter: MeterDto): Promise<InsertResult> {
    return this.meterRepository.insert(meter);
  }

  public updateMeter(meter: MeterDto): Promise<UpdateResult> {
    return this.meterRepository.update(meter.id, meter);
  }

  public deleteMeter(id: string): Promise<DeleteResult> {
    return this.meterRepository.delete({ id });
  }

  public async getAllMeters(
    query: MeterQueryModel,
  ): Promise<PaginationModel<Meter>> {
    const { page, offset, type } = query;

    const sortByType: FindOneOptions<Meter> = type && {
      where: {
        type,
      },
    };

    const [result, totalCount] = await this.meterRepository.findAndCount({
      ...sortByType,
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
