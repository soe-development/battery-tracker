import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UPSModelsDirectory } from './ups-models-directory.entity';
import { OtherEquipmentDirectory } from './other-equipment-directory.entity';

@Entity()
export class EquipmentCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  upsModelsDirectoryId: number | null;

  @ManyToOne(
    () => UPSModelsDirectory,
    (upsModelsDirectory) => upsModelsDirectory.id,
    { nullable: true },
  )
  upsModelsDirectory: UPSModelsDirectory | null;

  @Column({ nullable: true })
  otherEquipmentDirectoryId: number | null;

  @ManyToOne(
    () => OtherEquipmentDirectory,
    (otherEquipmentDirectory) => otherEquipmentDirectory.id,
    { nullable: true },
  )
  otherEquipmentDirectory: OtherEquipmentDirectory | null;

  @CreateDateColumn()
  createDate: Date;

  @Column({ nullable: true, default: false })
  writtenOff: string;
}
