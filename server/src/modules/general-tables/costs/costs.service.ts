import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Costs } from 'src/entities/directories/costs.entity';
import { OtherEquipmentDirectory } from 'src/entities/directories/other-equipment-directory.entity';
import { Total } from 'src/entities/directories/total.entity';
import { UPSModelsDirectory } from 'src/entities/directories/ups-models-directory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CostsService {
  constructor(
    @InjectRepository(Costs)
    private readonly costsRepository: Repository<Costs>,
    @InjectRepository(Total)
    private readonly totalRepository: Repository<Total>,
    @InjectRepository(UPSModelsDirectory)
    private readonly upsModelsDirectoryRepository: Repository<UPSModelsDirectory>,
    @InjectRepository(OtherEquipmentDirectory)
    private readonly OtherEquipmentDirectoryRepository: Repository<OtherEquipmentDirectory>,
  ) {}

  async create(data: any): Promise<Costs> {
    return this.costsRepository.save(data);
  }

  // LEFT JOIN objectsDirectory obj ON obj.id = ups.objectsDirectoryId
  //     LEFT JOIN districtsDirectory dist ON dist.id = obj.districtsDirectoryId
  // async findById(id: number) {
  //   // Выполняем сырой SQL-запрос
  //   const data = await this.upsModelsDirectoryRepository.query(
  //     `
  //     SELECT
  //       ups.id as id ,
  //       'ups_models_directory' AS source_table,
  //       ups.power,
  //       ups.inventoryNumber,
  //       ups.dateOfLastBatteryReplacement,
  //       NULL AS producer,
  //       NULL AS model,
  //       NULL AS numberOfBatteries,
  //       NULL AS typeBattery,
  //       NULL AS ups.batteriesDirectoryId,
  //     FROM ups_models_directory ups
  //     LEFT JOIN batteriesDirectory bat ON bat.id = ups.batteriesDirectoryId

  //     WHERE ups.batteriesDirectoryId = ?

  //     UNION ALL

  //     SELECT
  //       other.id as id,
  //       'other_equipment_directory' AS source_table,
  //       NULL AS power,
  //       NULL AS inventoryNumber,
  //       NULL AS dateOfLastBatteryReplacement,
  //       NULL AS other.producer,
  //       NULL AS other.model,
  //       NULL AS other.numberOfBatteries,
  //       NULL AS other.typeBattery,
  //       NULL AS other.batteriesDirectoryId,

  //     FROM other_equipment_directory other
  //     LEFT JOIN batteriesDirectory bat ON bat.id = other.batteriesDirectoryId
  //     WHERE other.batteriesDirectoryId = ?

  //     ORDER BY id ASC
  //     `,
  //     [id, id],
  //   );

  //   // NULL AS obj.id AS objectId,
  //   // NULL AS obj.name AS objectsDirectoryName,
  //   // NULL AS obj.voltage AS voltage,
  //   // NULL AS dist.id AS districtId,
  //   // NULL AS dist.name AS districtName

  //   // Преобразуем данные
  //   const result = data.map((element: any) => {
  //     const {
  //       id,
  //       source_table,
  //       power = 0,
  //       inventoryNumber = null,
  //       dateOfLastBatteryReplacement = null,
  //       producer = null,
  //       model = null,
  //       numberOfBatteries = null,
  //       typeBattery = null,
  //       batteriesDirectoryId = null,
  //       objectId = null,
  //       objectsDirectoryName = 'N/A',
  //       voltage = 0,
  //       districtId = null,
  //       districtName = 'N/A',
  //     } = element;

  //     return {
  //       id,
  //       sourceTable: source_table,
  //       batteriesDirectoryId,
  //       power,
  //       inventoryNumber,
  //       dateOfLastBatteryReplacement,
  //       producer,
  //       model,
  //       numberOfBatteries,
  //       typeBattery,
  //       objectId,
  //       objectsDirectoryName,
  //       voltage,
  //       districtId,
  //       districtName,
  //     };
  //   });

  //   return result;
  // }

  async findById(id: number) {
    // Выполняем сырой SQL-запрос
    const data = await this.upsModelsDirectoryRepository.query(
      `
      SELECT 
        ups.id AS id, 
        'ups_models_directory' AS source_table,
        ups.producer AS producer,
        ups.model AS model,
        ups.power AS power,
        ups.typeBattery AS typeBattery,
        ups.numberOfBatteries AS numberOfBatteries,
        ups.inventoryNumber AS inventoryNumber,
        obj_ups.id AS objectId,
        obj_ups.name AS objectsDirectoryName,
        obj_ups.voltage AS voltage,
        dist_ups.id AS districtId,
        dist_ups.name AS districtName
      FROM ups_models_directory ups
      LEFT JOIN objects_directory obj_ups ON obj_ups.id = ups.objectsDirectoryId
      LEFT JOIN districts_directory dist_ups ON dist_ups.id = obj_ups.districtsDirectoryId
      WHERE ups.batteriesDirectoryId = ?
      
      UNION ALL
      
      SELECT 
        other.id AS id, 
        'other_equipment_directory' AS source_table,
        other.producer AS producer,
        other.model AS model,
        other.power AS power,
        other.typeBattery AS typeBattery,
        other.numberOfBatteries AS numberOfBatteries,
        other.inventoryNumber AS inventoryNumber,
        obj_other.id AS objectId,
        obj_other.name AS objectsDirectoryName,
        obj_other.voltage AS voltage,
        dist_other.id AS districtId,
        dist_other.name AS districtName
      FROM other_equipment_directory other
      LEFT JOIN objects_directory obj_other ON obj_other.id = other.objectsDirectoryId
      LEFT JOIN districts_directory dist_other ON dist_other.id = obj_other.districtsDirectoryId
      WHERE other.batteriesDirectoryId = ?
      
      ORDER BY id ASC
      `,
      [id, id], // Передаем значения для параметров
    );

    // Преобразуем данные
    const result = data.map((element: any) => {
      const {
        id,
        source_table,
        power = 0,
        inventoryNumber = null,
        dateOfLastBatteryReplacement = null,
        producer = null,
        model = null,
        numberOfBatteries = null,
        typeBattery = null,
        batteriesDirectoryId = null,
        objectId = null,
        objectsDirectoryName = 'N/A',
        voltage = 0,
        districtId = null,
        districtName = 'N/A',
      } = element;

      return {
        id,
        sourceTable: source_table,
        batteriesDirectoryId,
        objectId,
        districtId,

        districtName,
        objectsDirectoryName,
        voltage,

        producer,
        model,
        power,
        typeBattery,
        numberOfBatteries,
        inventoryNumber,
      };
    });

    return result;
  }
}
