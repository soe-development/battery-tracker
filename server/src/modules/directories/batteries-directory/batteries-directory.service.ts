import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BatteriesDirectory } from 'src/entities/directories/batteries-directory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BatteriesDirectoryService {
  constructor(
    @InjectRepository(BatteriesDirectory)
    private readonly batteriesDirectoryRepository: Repository<BatteriesDirectory>,
  ) {}

  async create(data: any): Promise<BatteriesDirectory> {
    return this.batteriesDirectoryRepository.save(data);
  }

  async find() {
    const result = await this.batteriesDirectoryRepository.find();
    return result;
  }

  async update(data: any) {
    const { id, typeBattery, a_h, term } = data;

    const result = this.batteriesDirectoryRepository.update(id, {
      typeBattery,
      a_h,
      term,
    });

    return result;
  }

  async delete(id: number) {
    try {
      return await this.batteriesDirectoryRepository.delete(id);
    } catch (error) {
      return false;
    }
  }
}
