import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BranchesDirectory } from './branches-directory.entity';

@Entity()
export class DistrictsDirectory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  name: string;

  @Column()
  branchesDirectoryId: number;

  @ManyToOne(
    () => BranchesDirectory,
    (branchesDirectory) => branchesDirectory.id,
  )
  branchesDirectory: BranchesDirectory;
}
