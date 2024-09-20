import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchesDirectory } from 'src/entities/directories/branches-directory.entity';
import { DistrictsDirectory } from 'src/entities/directories/districts-directory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DistrictsDirectoryService {
  constructor(
    @InjectRepository(DistrictsDirectory)
    private readonly districtsDirectory: Repository<DistrictsDirectory>,
    @InjectRepository(BranchesDirectory)
    private readonly branchesDirectory: Repository<BranchesDirectory>,
  ) {}

  async create(data: any): Promise<DistrictsDirectory> {
    return this.districtsDirectory.save(data);
  }

  async find() {
    const data = await this.branchesDirectory
      .createQueryBuilder('branchesDirectory')
      .leftJoinAndSelect(
        'branchesDirectory.districtsDirectories',
        'districtsDirectory',
      )
      .getMany();

    return data;
  }

  async findCreateData() {
    const data = await this.districtsDirectory
      .createQueryBuilder('districtsDirectory')
      .getMany();

    return data;
  }

  async update(data: any) {
    const { id, name } = data;

    return this.districtsDirectory.update(id, { name });
  }

  async delete(id: number) {
    return await this.districtsDirectory.delete(id);
  }
}
