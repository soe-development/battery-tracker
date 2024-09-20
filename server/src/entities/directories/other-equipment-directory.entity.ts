import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BatteriesDirectory } from './batteries-directory.entity';

@Entity()
export class OtherEquipmentDirectory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  producer: string;

  @Column()
  model: string;

  @Column({ type: 'double precision' })
  numberOfBatteries: number;

  @Column({ type: 'date' })
  dateOfLastBatteryReplacement: Date;

  @Column()
  batteriesDirectoryId: number;

  @ManyToOne(
    () => BatteriesDirectory,
    (batteriesDirectory) => batteriesDirectory.id,
  )
  batteriesDirectory: BatteriesDirectory;
}
