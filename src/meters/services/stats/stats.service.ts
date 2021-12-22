import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AfterLoad, Between, DeleteResult, InsertResult, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { PaginationModel } from '@models/pagination.model';
import { Reading } from '@entities/reading.entity';
import { ReadingDto } from '@dto/meter/reading.dto';
import { ReadingQueryModel } from '@models/query/reading-query.model';
import { ReadingUploadModel } from '@models/query/reading-upload.model';
import { Meter } from '@entities/meter.entity';
import { DateRangeQueryModel } from '@models/query/date-range-query.model';
import { MeterConsumptionQuery } from '@models/query/meter-consumption-query.model';
import { first } from 'rxjs';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Reading)
    private readonly readingRepository: Repository<Reading>,
    @InjectRepository(Meter)
    private readonly meterRepository: Repository<Meter>,
  ) {}


  private roundDate(date: string | Date): Date {
    let newDate = new Date(date)
    console.log("New date of ", date, newDate)
    newDate.setMilliseconds(0);
    return newDate
  }

  private getStep(begin: Date, end: Date): number[] {
    const diffTime = Math.floor(Math.abs(end.getTime() - begin.getTime()));
    console.log("Diff", diffTime)

    let step;
    if (diffTime <= 3_600_000) { // Hour
        step = 60_000 // 1 minute
    } else if (diffTime <= 86_400_000) { // Day
        step = 3_600_000 // Hour
    } else if (diffTime <= 2_592_000_000) { // Month
        step = 86_400_000 // Day
    } else {
        step = 2_592_000_000
    }

    let steps = Math.ceil(diffTime / step)
    return [steps, step]
  }

  public getFunctionForPoints(x1: number, y1: number, x2: number, y2: number) {
        let k = (y1 - y2) / (x1 - x2)
        let b = y2 - k * x2
        return function (x) {
            return k * x + b
        }
    }
  
  public getMeterCount(): Promise<number> {
    return this.meterRepository.count()
  }


  public async getReceivedReadingCount({from, to}: DateRangeQueryModel) {
    from = from.replace("'", '').replace('"', '').replace("'", '').replace('"', '')
    to = to.replace("'", '').replace('"', '').replace("'", '').replace('"', '')
    let begin = this.roundDate(from)
    let end = this.roundDate(to)
    let [steps, stepSize] = this.getStep(begin, end)


    console.log("Beginning from ", begin, "to", end, "with step", stepSize)    

    let result = []

    for (let i = 0; i < steps; i++) {
        let after = new Date(begin.getTime() + stepSize * i)
        let before = new Date(begin.getTime() + stepSize * (i + 1))
            
        result.push({
            at: after,
             count: await this.readingRepository.count({
                where: {
                ...(!!from && !!to ? { date: Between(after, before) } : {}),
                }
            })
        })
    }

    return result
  }

  public async getConsumption({from, to, type}: MeterConsumptionQuery) {
      
    from = from.replace("'", '').replace('"', '').replace("'", '').replace('"', '')
    to = to.replace("'", '').replace('"', '').replace("'", '').replace('"', '')
    let begin = this.roundDate(from)
    let end = this.roundDate(to)
    let [steps, stepSize] = this.getStep(begin, end)


    console.log("Beginning from ", begin, "to", end, "with step", stepSize, "for", type) 
    
    let meters = await this.meterRepository.find({type})

    let result = []

    for (let i = 0; i < steps; i++) {
        let after = new Date(begin.getTime() + stepSize * i)
        let before = new Date(begin.getTime() + stepSize * (i + 1))

        let consumption = 0;

        for (let meter of meters) {
            let firstReading = await this.readingRepository.findOne({
                where: {
                    meterId: meter.id,
                    date: LessThanOrEqual(after)
                },
                order: {
                    date: 'DESC',
                },
            })
            if (firstReading == null) {
                firstReading = await this.readingRepository.findOne({
                    where: {
                        meterId: meter.id,
                        date: Between(after, before)
                    },
                    order: {
                        date: 'DESC',
                    },
    
                })
                if (firstReading == null) {
                    continue
                }
            }
            let lastReading = await this.readingRepository.findOne({
                where: {
                    meterId: meter.id,
                    date: MoreThanOrEqual(before)
                },
                order: {
                    date: 'ASC',
                },

            })
            if (lastReading == null) {
                lastReading = await this.readingRepository.findOne({
                    where: {
                        meterId: meter.id,
                        date: Between(after, before)
                    },
                    order: {
                        date: 'ASC',
                    },
    
                })
                if (lastReading == null) {
                    continue
                }
            }

            

            let fn = this.getFunctionForPoints(
                lastReading.date.getTime(),
                lastReading.value,
                firstReading.date.getTime(), 
                 
                firstReading.value
            )

            let delta = fn(before.getTime()) - fn(after.getTime())

            console.log("NOT NULL", delta)
            consumption += delta
        }
            
        result.push({
            at: after,
            consumption,
        })
    }
    return result
  }
}
