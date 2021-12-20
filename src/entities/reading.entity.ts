import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Meter } from '@entities/meter.entity';

@Entity()
export class Reading {
  @PrimaryGeneratedColumn('increment')
  public id: string;

  @Column()
  @ManyToOne((type) => Meter, (meter) => meter.id)
  public meterId: string;

  @Column({ type: 'timestamptz' })
  public date: Date;

  @Column()
  public value: number;
}
