import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UPSModelsDirectory } from './ups-models-directory.entity';
import { ObjectsDirectory } from './objects-directory.entity';
import { EquipmentCard } from './equipment-card.entity';

@Entity()
export class Total {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  upsModelsDirectoryId: number;

  @ManyToOne(
    () => UPSModelsDirectory,
    (upsModelsDirectory) => upsModelsDirectory.id,
  )
  upsModelsDirectory: UPSModelsDirectory;

  @Column({ default: null })
  objectsDirectoryId: number;

  @ManyToOne(() => ObjectsDirectory, (objectsDirectory) => objectsDirectory.id)
  objectsDirectory: ObjectsDirectory;

  @ManyToOne(() => EquipmentCard, (equipmentCard) => equipmentCard.id)
  equipmentCard: EquipmentCard;
}
