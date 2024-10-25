import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipmentCard } from 'src/entities/directories/equipment-card.entity';
import { UPSModelsDirectory } from 'src/entities/directories/ups-models-directory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EquipmentCardService {
  constructor(
    @InjectRepository(EquipmentCard)
    private readonly equipmentCardRepository: Repository<EquipmentCard>,
    @InjectRepository(UPSModelsDirectory)
    private readonly upsModelsDirectoryRepository: Repository<UPSModelsDirectory>,
  ) {}

  async create(data: any): Promise<EquipmentCard> {
    return this.equipmentCardRepository.save(data);
  }

  async findCommonData() {
    const data = await this.equipmentCardRepository
      .createQueryBuilder('equipmentCard')
      .leftJoin('equipmentCard.upsModelsDirectory', 'upsModelsDirectory')
      .leftJoin(
        'upsModelsDirectory.otherEquipmentDirectory',
        'otherEquipmentDirectory',
      )
      .leftJoin(
        'otherEquipmentDirectory.batteriesDirectory',
        'batteriesDirectory',
      )
      .select([
        'equipmentCard',
        'upsModelsDirectory',
        'otherEquipmentDirectory',
        'batteriesDirectory',
      ])
      .getMany();

    const result = data
      .map(
        ({
          id,
          date,
          typeBattery,
          numberOfBatteries,
          upsModelsDirectory,
        }: any) => {
          if (!upsModelsDirectory) {
            return null;
          }

          const {
            id: upsModelsDirectoryId,
            power,
            yearProductionUPS,
            inventoryNumber,
            s_n,
            apcs,
            otherEquipmentDirectory,
          } = upsModelsDirectory;

          if (!otherEquipmentDirectory) {
            return null;
          }

          const {
            id: otherEquipmentDirectoryId,
            producer,
            model,
            numberOfBatteries: otherNumberOfBatteries,
            batteriesDirectory,
          } = otherEquipmentDirectory;

          const { id: batteriesDirectoryId, typeBattery: otherTypeBattery } =
            batteriesDirectory || {};

          return {
            id,
            addId: batteriesDirectoryId,
            upsModelsDirectoryId,
            otherEquipmentDirectoryId,
            batteriesDirectoryId,
            producer,
            model,
            power,
            typeBattery: typeBattery || otherTypeBattery,
            numberOfBatteries: numberOfBatteries || otherNumberOfBatteries,
            yearProductionUPS,
            inventoryNumber,
            s_n,
            apcs,
            //date,
          };
        },
      )
      .filter(Boolean); // Фильтруем `null` значения, если они возникли из-за отсутствия `upsModelsDirectory` или `otherEquipmentDirectory`.

    return result;
  }

  async findBatteryReplacement(upsModelsDirectoryId: number) {
    try {
      const data = await this.equipmentCardRepository
        .createQueryBuilder('equipmentCardRepository')
        .leftJoin(
          'equipmentCardRepository.upsModelsDirectory',
          'upsModelsDirectory',
        )
        .select(['equipmentCardRepository'])
        .where('equipmentCardRepository.upsModelsDirectoryId = :id', {
          id: upsModelsDirectoryId,
        })
        .getMany();

      const result = data.map((element: any) => {
        return element;
      });
      return result;
    } catch (error) {
      return [];
    }
  }

  async delete(id: number) {
    try {
      return await this.equipmentCardRepository.delete(id);
    } catch (error) {
      return false;
    }
  }
}
