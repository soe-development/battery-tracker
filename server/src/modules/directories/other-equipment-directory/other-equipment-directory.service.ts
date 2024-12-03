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
      .select(['otherEquipmentDirectory', 'batteriesDirectory.typeBattery'])
      .getMany();

    const result = data.map((element: any) => {
      const {
        batteriesDirectory: { typeBattery },
        ...rest
      } = element;

      return (element = {
        id: element.id,
        batteriesDirectoryId: element.batteriesDirectoryId,
        producer: element.producer,
        model: element.model,
        typeBattery: typeBattery,
        numberOfBatteries: element.numberOfBatteries,
        dateOfLastBatteryReplacement: element.dateOfLastBatteryReplacement,
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
    const { id, producer, model, numberOfBatteries } = data;

    return this.otherEquipmentDirectoryRepository.update(id, {
      producer,
      model,
      numberOfBatteries,
    });
  }
  async delete(id: number) {
    try {
      return await this.otherEquipmentDirectoryRepository.delete(id);
    } catch (error) {
      return false;
    }
  }
}
