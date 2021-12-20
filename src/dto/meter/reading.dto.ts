import { IsNotEmpty } from 'class-validator';

export class ReadingDto {
  @IsNotEmpty()
  public meterId: string;

  @IsNotEmpty()
  public date: Date;

  @IsNotEmpty()
  public value: number;
}
