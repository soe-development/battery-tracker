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
    const data = await this.batteryReplacementRepository.query(`
      SELECT 
          br.id AS id,
          MAX(br.createDate) AS dateOfLastBatteryReplacement,
  
          ec.id AS equipmentCardId,
          ups.producer AS producer,
          ups.model AS model,
          ups.power AS power,
          br.typeBattery AS typeBattery,
          br.numberOfBatteries AS numberOfBatteries,
          ups.inventoryNumber AS inventoryNumber,
  
          obj.name AS objectsDirectoryName,
          obj.voltage AS voltage,
          dist.name AS districtName,
  
          NULL AS batteryId
  
      FROM battery_replacement br
      JOIN equipment_card ec ON ec.id = br.equipmentCardId
      JOIN ups_models_directory ups ON ups.id = ec.upsModelsDirectoryId
      LEFT JOIN objects_directory obj ON obj.id = ups.objectsDirectoryId
      LEFT JOIN districts_directory dist ON dist.id = obj.districtsDirectoryId

      WHERE ec.writtenOff = "Дійсне"
  
      GROUP BY 
          br.id, ec.id, ups.producer, ups.model, ups.power, ups.typeBattery,
          ups.numberOfBatteries, ups.inventoryNumber, obj.name, obj.voltage, dist.name
  
      UNION ALL
  
      SELECT 
          br.id AS id,
          MAX(br.createDate) AS dateOfLastBatteryReplacement,
  
          ec.id AS equipmentCardId,
          other.producer AS producer,
          other.model AS model,
          other.power AS power,
          br.typeBattery AS typeBattery,
          br.numberOfBatteries AS numberOfBatteries,
          other.inventoryNumber AS inventoryNumber,
  
          obj.name AS objectsDirectoryName,
          obj.voltage AS voltage,
          dist.name AS districtName,
  
          other.batteriesDirectoryId AS batteryId
  
      FROM battery_replacement br
      JOIN equipment_card ec ON ec.id = br.equipmentCardId
      JOIN other_equipment_directory other ON other.id = ec.otherEquipmentDirectoryId
      LEFT JOIN objects_directory obj ON obj.id = other.objectsDirectoryId
      LEFT JOIN districts_directory dist ON dist.id = obj.districtsDirectoryId

      WHERE ec.writtenOff = "Дійсне"
  
      GROUP BY 
          br.id, ec.id, other.producer, other.model, other.power, br.typeBattery,
          br.numberOfBatteries, other.inventoryNumber, other.batteriesDirectoryId,
          obj.name, obj.voltage, dist.name
  
      ORDER BY id;
    `);

    const result = data.map((element: any) => {
      return {
        id: element.id || 0,
        upsModelsDirectoryId: element.upsModelsDirectoryId || 'N/A',
        districtName: element.districtName || 'N/A',
        objectsDirectoryName: element.objectsDirectoryName || 'N/A',
        voltage: element.voltage || 'N/A',
        producer: element.producer || 'N/A',
        model: element.model || 'N/A',
        power: element.power || 0,
        numberOfBatteries: element.numberOfBatteries || 0,
        inventoryNumber: element.inventoryNumber || 'N/A',
        batteryId: element.batteryId || 'N/A',
        typeBattery: element.typeBattery || 'N/A',
        dateOfLastBatteryReplacement:
          new Date(element.dateOfLastBatteryReplacement)
            .toISOString()
            .split('T')[0] || 'N/A',
      };
    });

    return result;
  }

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
