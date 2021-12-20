import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reading {
  @PrimaryGeneratedColumn('increment')
  public id: string;

  @Column()
  public meterId: string;

  @Column({ type: 'timestamptz' })
  public date: Date;

  @Column()
  public value: number;
}
