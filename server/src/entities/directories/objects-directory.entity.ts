import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DistrictsDirectory } from './districts-directory.entity';

@Entity()
export class ObjectsDirectory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  name: string;

  @Column({ type: 'double precision' })
  voltage: number;

  @Column()
  districtsDirectoryId: number;

  @ManyToOne(
    () => DistrictsDirectory,
    (districtsDirectory) => districtsDirectory.id,
  )
  districtsDirectory: DistrictsDirectory;
}
