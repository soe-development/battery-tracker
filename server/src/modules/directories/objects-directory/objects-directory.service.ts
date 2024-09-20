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
      .select(['objectsDirectoryRepository', 'districtsDirectory.name'])
      .getMany();

    const result = data.map((element) => {
      const {
        id,
        districtsDirectory: { name: districtName },
        name,
        voltage,
      } = element;

      return {
        id: id,
        districtName: districtName,
        objectName: name,
        voltage: voltage,
      };
    });
    return result;
  }

  async update(data: any) {
    const { id, objectName: name, voltage } = data;
    const result = await this.objectsDirectoryRepository.update(id, {
      name,
      voltage,
    });
    return result;
  }

  async delete(id: number) {
    const result = await this.objectsDirectoryRepository.delete(id);
    return result;
  }
}
