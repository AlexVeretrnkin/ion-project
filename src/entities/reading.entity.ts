import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Meter } from '@entities/meter.entity';

@Entity()
export class Reading {
  @Column()
  @ManyToOne((type) => Meter, (meter) => meter.id, {
    cascade: true,
  })
  public meterId: string;

  @Column({ type: 'timestamptz' })
  public date: Date;

  @Column()
  public value: number;
}
