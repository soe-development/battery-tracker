import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Costs } from 'src/entities/directories/costs.entity';
import { Total } from 'src/entities/directories/total.entity';
import { UPSModelsDirectory } from 'src/entities/directories/ups-models-directory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CostsService {
  constructor(
    @InjectRepository(Costs)
    private readonly expensesRepository: Repository<Costs>,
    @InjectRepository(Total)
    private readonly totalRepository: Repository<Total>,
    @InjectRepository(UPSModelsDirectory)
    private readonly upsModelsDirectoryRepository: Repository<UPSModelsDirectory>,
  ) {}

  async create(data: any): Promise<Costs> {
    return this.expensesRepository.save(data);
  }

  async findById(id: number) {
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
      .where('batteriesDirectory.id = :id', { id: id })
      .getMany();

    const result = data.map((element: any) => {
      const {
        id: upsModelsDirectoryId = null,
        power = 0,
        inventoryNumber = null,
        dateOfLastBatteryReplacement = null,
        otherEquipmentDirectory = {},
        objectsDirectory = {},
      } = element;

      const {
        producer = null,
        model = null,
        numberOfBatteries = null,
        batteriesDirectoryId = null,
        batteriesDirectory = {},
      } = otherEquipmentDirectory;

      const { typeBattery = null } = batteriesDirectory;

      const {
        id: objectId = null,
        name: objectName = 'N/A',
        voltage = 0,
        districtsDirectory = {},
      } = objectsDirectory || {};

      const { id: districtId = null, name: districtName = 'N/A' } =
        districtsDirectory || {};

      return {
        upsModelsDirectoryId,
        batteriesDirectoryId,
        objectId,
        districtId,

        districtName,
        objectName,
        voltage,
        producer,
        model,
        power,
        numberOfBatteries,

        inventoryNumber,
      };
    });

    return result;
  }
}
