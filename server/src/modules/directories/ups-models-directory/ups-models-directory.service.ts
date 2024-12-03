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
        'upsModelsDirectoryRepository.batteriesDirectory',
        'batteriesDirectory',
      )
      .leftJoin(
        'upsModelsDirectoryRepository.objectsDirectory',
        'objectsDirectory',
      )
      .leftJoin('objectsDirectory.districtsDirectory', 'districtsDirectory')
      .select([
        'upsModelsDirectoryRepository',
        'batteriesDirectory',
        'objectsDirectory',
        'districtsDirectory',
      ])
      .getMany();

    const result = data.map((element: any) => {
      const {
        id: upsModelsDirectoryid = null,
        producer = null,
        model = null,
        power = null,
        batteriesDirectoryId,
        typeBattery = null,
        numberOfBatteries = null,
        yearProductionUPS = null,
        inventoryNumber = null,
        s_n = null,
        apcs = null,
        dateOfLastBatteryReplacement = null,
        objectsDirectoryId,
        objectLocation = null,
        objectsDirectory,
      } = element || {};

      const { districtsDirectory = {} } = objectsDirectory || {};

      const { id: districtsDirectoryId = null, branchesDirectoryId = null } =
        districtsDirectory || {};

      return {
        id: upsModelsDirectoryid,
        upsModelsDirectoryid,
        batteriesDirectoryId,
        objectsDirectoryId,
        districtsDirectoryId,
        branchesDirectoryId,
        producer,
        model,
        power,
        typeBattery,
        numberOfBatteries,
        yearProductionUPS,
        inventoryNumber,
        s_n,
        apcs,
        dateOfLastBatteryReplacement:
          dateOfLastBatteryReplacement === null
            ? '-'
            : dateOfLastBatteryReplacement,
        objectsDirectoryName: objectLocation,
      };
    });

    return result;
  }

  async update(data: any) {
    const {
      id,
      dateOfLastBatteryReplacement,
      objectsDirectoryName,
      districtsDirectoryId,
      branchesDirectoryId,
      upsModelsDirectoryid,
      ...rest
    } = data;

    try {
      const updateData = {
        ...rest,
        dateOfLastBatteryReplacement:
          dateOfLastBatteryReplacement === '-'
            ? null
            : dateOfLastBatteryReplacement,
        objectLocation:
          objectsDirectoryName === '-' ? null : objectsDirectoryName,
      };

      return await this.upsModelsDirectoryRepository.update(id, updateData);
    } catch (error) {
      console.error('Error updating record:', error);
      throw new Error('Failed to update record');
    }
  }

  async delete(id: number) {
    try {
      return await this.upsModelsDirectoryRepository.delete(id);
    } catch (error) {
      return false;
    }
  }
}
