import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UPSModelsDirectory } from './ups-models-directory.entity';
import { BatteryReplacement } from './battery-replacement.entity';
import { Receipt } from './receipts.entity';

@Entity()
export class EquipmentCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  upsModelsDirectoryId: number;

  @ManyToOne(
    () => UPSModelsDirectory,
    (upsModelsDirectory) => upsModelsDirectory.id,
  )
  upsModelsDirectory: UPSModelsDirectory;

  @CreateDateColumn()
  createDate: Date;

  // @Column()
  // typeBattery: string;

  // @Column()
  // numberOfBatteries: number;

  // @ManyToOne(() => Receipt, (receipt) => receipt.id)
  // receipt: Receipt;
}
