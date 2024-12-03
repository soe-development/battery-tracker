import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectsDirectory } from 'src/entities/directories/objects-directory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ObjectsDirectoryService {
  constructor(
    @InjectRepository(ObjectsDirectory)
    private readonly objectsDirectoryRepository: Repository<ObjectsDirectory>,
  ) {}

  async create(data: any): Promise<ObjectsDirectory> {
    return this.objectsDirectoryRepository.save(data);
  }

  async find() {
    const data = await this.objectsDirectoryRepository
      .createQueryBuilder('objectsDirectoryRepository')
      .leftJoin(
        'objectsDirectoryRepository.districtsDirectory',
        'districtsDirectory',
      )
      .select(['objectsDirectoryRepository', 'districtsDirectory'])
      .getMany();

    const result = data.map((element) => {
      const {
        id,
        name,
        voltage,
        districtsDirectory: { id: districtsDirectoryId, name: districtName },
      } = element;

      return {
        id: id,
        districtsDirectoryId: districtsDirectoryId,
        districtName: districtName,
        objectsDirectoryName: name,
        voltage: voltage,
      };
    });
    return result;
  }

  async update(data: any) {
    const {
      id,
      objectsDirectoryName: name,
      voltage,
      districtsDirectoryId,
    } = data;
    const result = await this.objectsDirectoryRepository.update(id, {
      name,
      voltage,
      districtsDirectoryId,
    });
    return result;
  }

  async delete(id: number) {
    try {
      return await this.objectsDirectoryRepository.delete(id);
    } catch (error) {
      return false;
    }
  }
}
