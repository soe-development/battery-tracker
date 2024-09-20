import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EquipmentCard } from './directories/equipment-card.entity';
import { UPSModelsDirectory } from './directories/ups-models-directory.entity';
import { ObjectsDirectory } from './directories/objects-directory.entity';

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  upsModelsDirectoryId: number;

  @ManyToOne(
    () => UPSModelsDirectory,
    (upsModelsDirectory) => upsModelsDirectory.id,
  )
  upsModelsDirectory: UPSModelsDirectory;

  @Column()
  objectsDirectoryId: number;

  @ManyToOne(() => ObjectsDirectory, (objectsDirectory) => objectsDirectory.id)
  objectsDirectory: ObjectsDirectory;

  @Column()
  equipmentСardId: number;

  @ManyToOne(() => EquipmentCard, (equipmentСard) => equipmentСard.id)
  equipmentСard: EquipmentCard;
}
