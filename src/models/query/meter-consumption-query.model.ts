import { PaginationQueryModel } from '@models/query/pagination-query.model';
import { MeterEnum } from '../../enums/meter.enum';
import { DateRangeQueryModel } from './date-range-query.model';

export type MeterConsumptionQuery = DateRangeQueryModel & {
  type: MeterEnum;
};
