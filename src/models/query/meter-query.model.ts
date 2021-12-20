import { PaginationQueryModel } from '@models/query/pagination-query.model';
import { MeterEnum } from '../../enums/meter.enum';

export type MeterQueryModel = PaginationQueryModel & {
  type: MeterEnum;
};
