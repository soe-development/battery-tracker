import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Notifications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  text: string;

  @Column()
  severity: string;

  @Column()
  table: string;

  @Column()
  tableId: number;

  @Column({ unique: true, default: null })
  uniqueCode: string;

  @Column()
  roleId: number;

  @Column()
  route: string;
}
