import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Receipt } from './receipts.entity';
import { UPSModelsDirectory } from './ups-models-directory.entity';
import { EquipmentCard } from './equipment-card.entity';
// import { OtherEquipmentDirectory } from './other-equipment-directory.entity';
// import { EquipmentCard } from './equipment-card.entity';

@Entity()
export class BatteryReplacement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  equipmentCardId: number;

  @Column({ default: null })
  typeBattery: string;

  @Column()
  numberOfBatteries: number;

  @Column({ type: 'date' })
  createDate: string;

  @Column({ default: null })
  receiptId: number;

  @ManyToOne(() => Receipt, (receipt) => receipt.id)
  receipt: Receipt;

  @ManyToOne(() => EquipmentCard, (equipmentCard) => equipmentCard.id)
  equipmentCard: EquipmentCard;
}
