import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UPSModelsDirectory } from './ups-models-directory.entity';
import { OtherEquipmentDirectory } from './other-equipment-directory.entity';
import { BatteriesDirectory } from './batteries-directory.entity';

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  dateOfReceiving: Date;

  @Column()
  numbers: number;

  @Column({ type: 'double precision', default: null })
  currentBalance: number;

  // @Column()
  // typeBattery: string;

  @Column({ type: 'date' })
  contractDate: Date;

  @Column({ default: null })
  counterparty: string;

  @Column({ default: null })
  contractNumber: string;

  @ManyToOne(
    () => BatteriesDirectory,
    (batteriesDirectory) => batteriesDirectory.id,
  )
  batteriesDirectory: BatteriesDirectory;

  @Column({ default: null })
  batteriesDirectoryId: number;
}
