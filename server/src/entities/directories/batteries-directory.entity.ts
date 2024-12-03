import {
  BeforeRemove,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class BatteriesDirectory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  typeBattery: string;

  @Column({ name: 'A/h', type: 'double precision' })
  a_h: number;

  @Column({ name: 'term', type: 'double precision', default: 0 })
  term: string;
}
