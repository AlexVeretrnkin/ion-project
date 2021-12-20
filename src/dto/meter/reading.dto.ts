import { IsNotEmpty } from 'class-validator';

export class ReadingDto {
  @IsNotEmpty()
  date: Date;

  @IsNotEmpty()
  value: number;
}
