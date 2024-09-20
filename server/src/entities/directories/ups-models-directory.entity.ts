import {
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BatteriesDirectory } from './batteries-directory.entity';
import { OtherEquipmentDirectory } from './other-equipment-directory.entity';
import { ObjectsDirectory } from './objects-directory.entity';
import { DistrictsDirectory } from './districts-directory.entity';

@Entity()
export class UPSModelsDirectory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'power', type: 'double precision' })
  power: number;

  @Column({ type: 'year' })
  yearProductionUPS: Date;

  @Column()
  inventoryNumber: number;

  @Column({ name: 's/n', default: null })
  s_n: string;

  @Column({ name: 'APCS' })
  apcs: string;

  @Column({ type: 'date', default: null })
  dateOfLastBatteryReplacement: string;

  @Column()
  otherEquipmentDirectoryId: number;

  @Column({ default: null })
  objectsDirectoryId: number;

  @ManyToOne(
    () => OtherEquipmentDirectory,
    (otherEquipmentDirectory) => otherEquipmentDirectory.id,
  )
  otherEquipmentDirectory: OtherEquipmentDirectory;

  @ManyToOne(() => ObjectsDirectory, (ObjectsDirectory) => ObjectsDirectory.id)
  objectsDirectory: ObjectsDirectory;
}
