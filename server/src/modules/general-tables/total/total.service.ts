import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BatteryReplacement } from 'src/entities/directories/battery-replacement.entity';
import { Total } from 'src/entities/directories/total.entity';
import { UPSModelsDirectory } from 'src/entities/directories/ups-models-directory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TotalService {
  constructor(
    @InjectRepository(Total)
    private readonly totalRepository: Repository<Total>,
    @InjectRepository(UPSModelsDirectory)
    private readonly upsModelsDirectoryRepository: Repository<UPSModelsDirectory>,
    @InjectRepository(BatteryReplacement)
    private readonly batteryReplacementRepository: Repository<BatteryReplacement>,
  ) {}

  async create(data: any): Promise<Total> {
    return this.totalRepository.save(data);
  }

  async find() {
    // const data = await this.upsModelsDirectoryRepository
    //   .createQueryBuilder('upsModelsDirectory')
    //   .leftJoin('upsModelsDirectory.objectsDirectory', 'objectsDirectory')
    //   .leftJoin('objectsDirectory.districtsDirectory', 'districtsDirectory')
    //   .leftJoin(
    //     'upsModelsDirectory.otherEquipmentDirectory',
    //     'otherEquipmentDirectory',
    //   )
    //   .leftJoin(BatteryReplacement, 'batteryReplacement')
    //   .select([
    //     'upsModelsDirectory',
    //     'objectsDirectory',
    //     'districtsDirectory',
    //     'otherEquipmentDirectory',
    //     'batteriesDirectory',
    //   ])
    //   .getMany();

    const data = await this.batteryReplacementRepository
      .createQueryBuilder('batteryReplacement')
      .leftJoin('batteryReplacement.equipmentCard', 'equipmentCard')
      .leftJoin('equipmentCard.upsModelsDirectory', 'upsModelsDirectory')
      .leftJoin(
        'upsModelsDirectory.otherEquipmentDirectory',
        'otherEquipmentDirectory',
      )
      .leftJoin('upsModelsDirectory.objectsDirectory', 'objectsDirectory')
      .leftJoin('objectsDirectory.districtsDirectory', 'districtsDirectory')
      .select([
        'batteryReplacement',
        'equipmentCard',
        'upsModelsDirectory',
        'objectsDirectory',
        'districtsDirectory',
        'MAX(batteryReplacement.id) AS maxBatteryReplacementCreateDate',
      ])
      .groupBy('upsModelsDirectory.id')
      .addGroupBy('otherEquipmentDirectory.id')
      .addGroupBy('objectsDirectory.id')
      .addGroupBy('districtsDirectory.id')
      .addGroupBy('batteryReplacement.id')
      .getMany();

    const result = data.map((element: any) => {
      // Основные свойства
      const id = element.id || 0;

      const typeBattery = element.typeBattery || 'N/A';
      const numberOfBatteries = element.numberOfBatteries;

      const dateOfLastBatteryReplacement = element.createDate || 'N/A';

      // Обработка equipmentCard
      const equipmentCard = element.equipmentCard || {};
      const upsModelsDirectory = equipmentCard.upsModelsDirectory || {};

      // Обработка upsModelsDirectory
      const upsModelsDirectoryId = upsModelsDirectory.id || 'N/A';
      const power = upsModelsDirectory.power || 0;
      const inventoryNumber = upsModelsDirectory.inventoryNumber || 'N/A';

      const objectsDirectory = upsModelsDirectory.objectsDirectory || {};

      const objectName = objectsDirectory.name || 'N/A';
      const voltage = objectsDirectory.voltage || 'N/A';
      const districtsDirectory = objectsDirectory.districtsDirectory;
      const districtName = districtsDirectory.name || 'N/A';

      // Обработка otherEquipmentDirectory
      const otherEquipmentDirectory =
        upsModelsDirectory.otherEquipmentDirectory || {};

      // Обработка batteriesDirectory
      const batteriesDirectory =
        otherEquipmentDirectory.batteriesDirectory || {};
      const batteryId = batteriesDirectory.id || 'N/A';
      const model = otherEquipmentDirectory.model || 'N/A';
      const producer = otherEquipmentDirectory.producer || 'N/A';

      // Обработка createDate
      const createDate = element.createDate || 'N/A';

      return {
        id,
        upsModelsDirectoryId,
        districtName,
        objectName,
        voltage,
        producer,
        model,
        power,
        numberOfBatteries,
        inventoryNumber,
        batteryId,
        typeBattery,
        dateOfLastBatteryReplacement,

        //createDate,
      };
    });

    // Формирование результирующего объекта
    return result;
  }

  // async find() {
  //   const data = await this.totalRepository
  //     .createQueryBuilder('totalRepository')
  //     .leftJoin('totalRepository.upsModelsDirectory', 'upsModelsDirectory')
  //     .leftJoin(
  //       'upsModelsDirectory.otherEquipmentDirectory',
  //       'otherEquipmentDirectory',
  //     )
  //     .leftJoin(
  //       'otherEquipmentDirectory.batteriesDirectory',
  //       'batteriesDirectory',
  //     )
  //     .leftJoin('totalRepository.objectsDirectory', 'objectsDirectory')
  //     .leftJoin('objectsDirectory.districtsDirectory', 'districtsDirectory')
  //     .leftJoin('totalRepository.equipmentCard', 'equipmentCard')
  //     .select([
  //       'totalRepository',
  //       'upsModelsDirectory',
  //       'otherEquipmentDirectory',
  //       'batteriesDirectory',
  //       'objectsDirectory',
  //       'districtsDirectory',
  //       'equipmentCard',
  //     ])
  //     .getMany();

  //   const result = data.map((element: any) => {
  //     // Основные свойства
  //     const id = element.id || 0;

  //     // Обработка objectsDirectory
  //     const objectsDirectory = element.objectsDirectory || {};
  //     const objectId = objectsDirectory.id || 0;
  //     const objectName = objectsDirectory.name || 'N/A';
  //     const voltage = objectsDirectory.voltage || 'N/A';

  //     const districtsDirectory = objectsDirectory.districtsDirectory || {};
  //     const districtId = districtsDirectory.id || 0;
  //     const districtName = districtsDirectory.name || 'N/A';

  //     // Обработка upsModelsDirectory
  //     const upsModelsDirectory = element.upsModelsDirectory || {};
  //     const upsModelsDirectoryId = upsModelsDirectory.id || 'N/A';
  //     const power = upsModelsDirectory.power || 'N/A';
  //     const inventoryNumber = upsModelsDirectory.inventoryNumber || 'N/A';

  //     // Обработка otherEquipmentDirectory
  //     const otherEquipmentDirectory =
  //       upsModelsDirectory.otherEquipmentDirectory || {};

  //     // Обработка batteriesDirectory
  //     const batteriesDirectory =
  //       otherEquipmentDirectory.batteriesDirectory || {};
  //     const batteryId = batteriesDirectory.id || 'N/A';
  //     const typeBattery = batteriesDirectory.typeBattery || 'N/A';

  //     const dateOfLastBatteryReplacement =
  //       otherEquipmentDirectory.dateOfLastBatteryReplacement || 'N/A';
  //     const model = otherEquipmentDirectory.model || 'N/A';
  //     const numberOfBatteries =
  //       otherEquipmentDirectory.numberOfBatteries || 'N/A';
  //     const producer = otherEquipmentDirectory.producer || 'N/A';

  //     // Обработка equipmentCard
  //     const equipmentCard = element.equipmentCard || {};
  //     const equipmentCardId = equipmentCard.id || 0;
  //     //const equipmentCardTypeBattery = equipmentCard.typeBattery || 'N/A';
  //     // const equipmentCardNumberOfBatteries =
  //     //   equipmentCard.numberOfBatteries || 'N/A';
  //     //const equipmentCardDate = equipmentCard.date || 'N/A';
  //     return {
  //       id,
  //       objectId,
  //       districtId,
  //       upsModelsDirectoryId,
  //       equipmentCardId,
  //       batteryId,

  //       districtName,
  //       objectName,
  //       voltage,

  //       producer,
  //       model,
  //       power,
  //       numberOfBatteries,
  //       inventoryNumber,
  //       typeBattery,
  //       dateOfLastBatteryReplacement,

  //       // equipmentCardTypeBattery,
  //       // equipmentCardNumberOfBatteries,
  //       // equipmentCardDate,
  //     };
  //   });

  //   // Формирование результирующего объекта

  //   return result;
  // }

  async delete(data: any) {
    try {
      const { id } = data;
      return await this.totalRepository.delete(id);
    } catch (error) {
      console.error(error);
      return;
    }
  }
}
