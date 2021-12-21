import { PaginationQueryModel } from '@models/query/pagination-query.model';

type Reading = {
    date: Date,
    value: Number
}

export type ReadingUploadModel = PaginationQueryModel & {
  meterKey: string;
  readings: Reading[]
};
