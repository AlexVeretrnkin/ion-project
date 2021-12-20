import { MeterEnum } from '../enums/meter.enum';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Meter {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  @Generated('uuid')
  public key: string;

  @Column()
  public type: MeterEnum;

  @Column()
  public name: string;

  @Column()
  public serial: string;

  @Column()
  public position: string;
}
