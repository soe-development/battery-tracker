import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BatteriesDirectory } from 'src/entities/directories/batteries-directory.entity';
import { OtherEquipmentDirectory } from 'src/entities/directories/other-equipment-directory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OtherEquipmentDirectoryService {
  constructor(
    @InjectRepository(OtherEquipmentDirectory)
    private readonly otherEquipmentDirectoryRepository: Repository<OtherEquipmentDirectory>,
  ) {}

  async create(data: any): Promise<OtherEquipmentDirectory> {
    return this.otherEquipmentDirectoryRepository.save(data);
  }

  async find() {
    const data = await this.otherEquipmentDirectoryRepository
      .createQueryBuilder('otherEquipmentDirectory')
      .leftJoin(
        'otherEquipmentDirectory.batteriesDirectory',
        'batteriesDirectory',
      )
      .leftJoin('otherEquipmentDirectory.objectsDirectory', 'objectsDirectory')
      .leftJoin('objectsDirectory.districtsDirectory', 'districtsDirectory')
      .select([
        'otherEquipmentDirectory',
        'batteriesDirectory.typeBattery',
        'objectsDirectory',
        'districtsDirectory',
      ])
      .getMany();

    const result = data.map((element: any) => {
      const {
        batteriesDirectory: { typeBattery },
        inventoryNumber = null,
        s_n = null,
        power = null,
        yearProductionUPS = null,
        apcs = null,
        dateOfLastBatteryReplacement = null,
        objectsDirectory = {},
      } = element;

      const {
        id: objectsDirectoryId = null,
        name: objectsDirectoryName = '-',
        districtsDirectory = {},
      } = objectsDirectory || {};

      const { id: districtsDirectoryId = null, branchesDirectoryId = null } =
        districtsDirectory || {};

      return (element = {
        id: element.id,
        batteriesDirectoryId: element.batteriesDirectoryId,
        objectsDirectoryId,
        districtsDirectoryId,
        branchesDirectoryId,
        producer: element.producer,
        model: element.model,
        power,
        typeBattery: typeBattery,
        numberOfBatteries: element.numberOfBatteries,
        yearProductionUPS,
        inventoryNumber,
        s_n,
        apcs,
        dateOfLastBatteryReplacement:
          dateOfLastBatteryReplacement === null
            ? '-'
            : dateOfLastBatteryReplacement,
        objectsDirectoryName,
      });
    });

    return result;
  }

  async findTypesBattery() {
    const data = await this.otherEquipmentDirectoryRepository
      .createQueryBuilder('otherEquipmentDirectory')
      .leftJoinAndSelect(
        'otherEquipmentDirectory.batteriesDirectory',
        'batteriesDirectory',
      )
      .select([
        'otherEquipmentDirectory.id',
        'otherEquipmentDirectory.producer',
        'otherEquipmentDirectory.model',
        'otherEquipmentDirectory.numberOfBatteries',
        'otherEquipmentDirectory.dateOfLastBatteryReplacement',
        'batteriesDirectory.id',
        'batteriesDirectory.typeBattery',
        'batteriesDirectory.A/h',
        'SUM(otherEquipmentDirectory.numberOfBatteries) as sumBatteries',
      ])
      .groupBy('otherEquipmentDirectory.id, batteriesDirectory.id')
      .execute();

    const result = data.map((element: any) => {
      const {
        otherEquipmentDirectory_id: otherEquipmentDirectoryId,
        batteriesDirectory_id: batteriesDirectoryid,
        batteriesDirectory_typeBattery: typeBattery,
        sumBatteries,
      } = element;

      return (element = {
        otherEquipmentDirectoryId,
        batteriesDirectoryid,
        typeBattery,
        sumBatteries,
      });
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

      return await this.otherEquipmentDirectoryRepository.update(
        id,
        updateData,
      );
    } catch (error) {
      console.error('Error updating record:', error);
      throw new Error('Failed to update record');
    }
  }
  async delete(id: number) {
    try {
      return await this.otherEquipmentDirectoryRepository.delete(id);
    } catch (error) {
      return false;
    }
  }
}
