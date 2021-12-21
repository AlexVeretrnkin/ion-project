import { MeterEnum } from '../enums/meter.enum';
import {
  Column,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reading } from '@entities/reading.entity';

@Entity()
export class Meter {
  @PrimaryGeneratedColumn('uuid')
  @OneToMany((type) => Reading, (reading) => reading.meterId, {
    cascade: true,
  })
  public id: string;

  @Column({unique: true})
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
