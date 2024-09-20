import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchesDirectory } from 'src/entities/directories/branches-directory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BranchesDirectoryService {
  constructor(
    @InjectRepository(BranchesDirectory)
    private readonly branchesDirectory: Repository<BranchesDirectory>,
  ) {}

  async create(data: any): Promise<BranchesDirectory> {
    return this.branchesDirectory.save(data);
  }

  async find() {
    const data = await this.branchesDirectory.find();
    return data;
  }

  async update(data: any) {
    const { id, name } = data;

    return this.branchesDirectory.update(id, { name });
  }

  async delete(id: number) {
    console.log(id);
    return await this.branchesDirectory.delete(id);
  }
}
