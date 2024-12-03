import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BatteriesDirectory } from './batteries-directory.entity';
import { ObjectsDirectory } from './objects-directory.entity';

@Entity()
export class UPSModelsDirectory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  producer: string;

  @Column()
  model: string;

  @Column({ name: 'power', type: 'double precision' })
  power: number;

  @Column()
  typeBattery: string;

  @Column({ type: 'double precision', default: 0 })
  numberOfBatteries: number;

  @Column({ type: 'year' })
  yearProductionUPS: Date;

  @Column()
  inventoryNumber: number;

  @Column({ name: 's/n', default: null })
  s_n: string;

  @Column({ name: 'APCS' })
  apcs: string;

  @Column()
  batteriesDirectoryId: number;

  @ManyToOne(
    () => BatteriesDirectory,
    (batteriesDirectory) => batteriesDirectory.id,
  )
  batteriesDirectory: BatteriesDirectory;

  @Column({ default: null })
  objectsDirectoryId: number;

  @Column({ default: null })
  objectLocation: string;

  @ManyToOne(() => ObjectsDirectory, (ObjectsDirectory) => ObjectsDirectory.id)
  objectsDirectory: ObjectsDirectory;

  @Column({ type: 'date', default: null })
  dateOfLastBatteryReplacement: string;
}
