import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DistrictsDirectory } from './districts-directory.entity';

@Entity()
export class BranchesDirectory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  name: string;

  @OneToMany(() => DistrictsDirectory, (district) => district.branchesDirectory)
  districtsDirectories: DistrictsDirectory[];
}
