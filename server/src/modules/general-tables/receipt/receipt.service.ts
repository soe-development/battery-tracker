import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BatteriesDirectory } from 'src/entities/directories/batteries-directory.entity';
import { OtherEquipmentDirectory } from 'src/entities/directories/other-equipment-directory.entity';
import { Receipt } from 'src/entities/directories/receipts.entity';
import { Total } from 'src/entities/directories/total.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepository: Repository<Receipt>,
    @InjectRepository(OtherEquipmentDirectory)
    private readonly otherEquipmentDirectoryRepository: Repository<OtherEquipmentDirectory>,
    @InjectRepository(Total)
    private readonly totalRepository: Repository<Total>,
  ) {}

  async create(data: any): Promise<Receipt> {
    return this.receiptRepository.save(data);
  }

  async find() {
    const data = await this.receiptRepository
      .createQueryBuilder('receipt')
      .leftJoin('receipt.batteriesDirectory', 'batteriesDirectory')
      .select(['receipt', 'batteriesDirectory'])
      .getMany();

    const result = data.map((element: any) => {
      const {
        id,
        batteriesDirectoryId,
        dateOfReceiving: date,
        numbers,
        currentBalance,
        counterparty,
        contractNumber,
        contractDate,
        batteriesDirectory,
      } = element;

      const dateOfReceiving = new Date(date).toISOString().split('T')[0];

      const { typeBattery } = batteriesDirectory;

      return (element = {
        id: batteriesDirectoryId,
        receiptId: id,
        dateOfReceiving,
        typeBattery,
        numbers,
        currentBalance,
        counterparty,
        contractNumber,
        contractDate,
      });
    });

    return result;
  }

  async findById(id: number) {
    const data = await this.receiptRepository
      .createQueryBuilder('receipt')
      .leftJoin('receipt.batteriesDirectory', 'batteriesDirectory')
      .select(['receipt', 'batteriesDirectory'])
      .where('receipt.id = :id', { id: id })
      .getMany();

    console.log(data, id);

    const result = data.map((element: any) => {
      const { batteriesDirectory } = element;

      const { typeBattery } = batteriesDirectory;

      return {
        typeBattery,
      };
    });

    return result[0];
  }

  async findCost(batteriesDirectoryId: any) {
    const data = await this.totalRepository
      .createQueryBuilder('totalRepository')
      .leftJoin('totalRepository.upsModelsDirectory', 'upsModelsDirectory')
      .leftJoin(
        'upsModelsDirectory.otherEquipmentDirectory',
        'otherEquipmentDirectory',
      )
      .leftJoin(
        'otherEquipmentDirectory.batteriesDirectory',
        'batteriesDirectory',
      )
      .leftJoin('totalRepository.objectsDirectory', 'objectsDirectory')
      .leftJoin('objectsDirectory.districtsDirectory', 'districtsDirectory')
      .leftJoin('totalRepository.equipmentCard', 'equipmentCard')

      .select([
        'totalRepository',
        'upsModelsDirectory',
        'otherEquipmentDirectory',
        'batteriesDirectory',
        'objectsDirectory',
        'districtsDirectory',
        'equipmentCard',
      ])
      .where(
        'otherEquipmentDirectory.batteriesDirectoryId = :batteriesDirectoryId',
        { batteriesDirectoryId: batteriesDirectoryId },
      )
      .getMany();

    const result = data.map((element: any) => {
      const {
        objectsDirectory: {
          id: objectId,
          name: objectName,
          voltage,
          districtsDirectory: { id: districtId, name: districtName },
        },
        upsModelsDirectory: {
          id: upsModelsDirectoryId,
          power,
          inventoryNumber,
          otherEquipmentDirectory: {
            batteriesDirectory: { id: batteryId, typeBattery },
            model,
            numberOfBatteries,
            producer,
          },
        },
      } = element;

      return (element = {
        objectId,
        objectName,
        voltage,
        districtId,
        districtName,
        upsModelsDirectoryId,
        power,
        inventoryNumber,
        batteryId,
        typeBattery,
        model,
        numberOfBatteries,
        producer,
      });
    });

    return result;
  }
  async delete(data: any) {
    try {
      const { id } = data;
      return await this.receiptRepository.delete(id);
    } catch (error) {
      console.error(error);
      return;
    }
  }
}
