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
    const { id, typeBattery, a_h } = data;

    const result = this.batteriesDirectoryRepository.update(id, {
      typeBattery,
      a_h,
    });

    return result;
  }

  async delete(id: number) {
    try {
      const result = await this.batteriesDirectoryRepository.delete(id);
      return result;
    } catch (error) {
      console.error(error);
      return;
    }
  }
}
