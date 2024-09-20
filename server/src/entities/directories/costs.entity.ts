import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UPSModelsDirectory } from './ups-models-directory.entity';
import { ObjectsDirectory } from './objects-directory.entity';
import { Receipt } from './receipts.entity';

@Entity()
export class Costs {
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

  @ManyToOne(() => Receipt, (receipts) => receipts.id)
  receipts: Receipt;
}