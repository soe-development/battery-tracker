import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UPSModelsDirectory } from 'src/entities/directories/ups-models-directory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UPSModelsDirectoryService {
  constructor(
    @InjectRepository(UPSModelsDirectory)
    private readonly upsModelsDirectoryRepository: Repository<UPSModelsDirectory>,
  ) {}

  async create(data: any): Promise<UPSModelsDirectory> {
    return this.upsModelsDirectoryRepository.save(data);
  }

  async find() {
    const data = await this.upsModelsDirectoryRepository
      .createQueryBuilder('upsModelsDirectoryRepository')
      .leftJoin(
        'upsModelsDirectoryRepository.otherEquipmentDirectory',
        'otherEquipmentDirectory',
      )
      .leftJoin(
        'otherEquipmentDirectory.batteriesDirectory',
        'batteriesDirectory',
      )
      .leftJoin(
        'upsModelsDirectoryRepository.objectsDirectory',
        'objectsDirectory',
      )
      .leftJoin('objectsDirectory.districtsDirectory', 'districtsDirectory')
      .select([
        'upsModelsDirectoryRepository',
        'otherEquipmentDirectory',
        'batteriesDirectory',
        'objectsDirectory',
        'districtsDirectory',
      ])
      .getMany();

    const result = data.map((element: any) => {
      const {
        id: upsModelsDirectoryid = null,
        power = null,
        inventoryNumber = null,
        s_n = null,
        yearProductionUPS = null,
        apcs = null,
        dateOfLastBatteryReplacement = null,
        otherEquipmentDirectory = {},
        objectsDirectory = {},
      } = element || {};

      const {
        id: otherEquipmentDirectoryId = null,
        producer = null,
        model = null,
        batteriesDirectory,
      } = otherEquipmentDirectory || {};

      const { typeBattery } = batteriesDirectory;

      const {
        id: objectsDirectoryId = null,
        name: objectsDirectoryName = null,
        districtsDirectory = {},
      } = objectsDirectory || {};

      const { id: districtsDirectoryId = null, branchesDirectoryId = null } =
        districtsDirectory || {};

      return {
        id: upsModelsDirectoryid,
        upsModelsDirectoryid,
        objectsDirectoryId,
        districtsDirectoryId,
        branchesDirectoryId,
        otherEquipmentDirectoryId,
        producer,
        model,
        typeBattery,
        power,
        inventoryNumber,
        s_n,
        yearProductionUPS,
        apcs,
        dateOfLastBatteryReplacement,
        objectsDirectoryName,
      };
    });

    return result;
  }

  async update(data: any) {
    const { id, power } = data;
    return this.upsModelsDirectoryRepository.update(id, { power });
  }

  async delete(id: number) {
    try {
      return await this.upsModelsDirectoryRepository.delete(id);
    } catch (error) {
      return false;
    }
  }
}
