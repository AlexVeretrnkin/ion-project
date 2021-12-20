import { PaginationQueryModel } from '@models/query/pagination-query.model';

export type ReadingQueryModel = PaginationQueryModel & {
  meterId: string;
  from: string;
  to: string;
};
