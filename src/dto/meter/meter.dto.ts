import { MeterEnum } from '../../enums/meter.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class MeterDto {
  @IsNotEmpty()
  @IsEnum(MeterEnum)
  public type: MeterEnum;

  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public serial: string;

  @IsNotEmpty()
  public position: string;

  public id?: string;
}
