import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipmentCard } from 'src/entities/directories/equipment-card.entity';
import { UPSModelsDirectory } from 'src/entities/directories/ups-models-directory.entity';
import { NotificationsService } from 'src/modules/notifications/notifications.service';
import { Repository } from 'typeorm';

@Injectable()
export class EquipmentCardService {
  constructor(
    @InjectRepository(EquipmentCard)
    private readonly equipmentCardRepository: Repository<EquipmentCard>,
    @InjectRepository(UPSModelsDirectory)
    private readonly upsModelsDirectoryRepository: Repository<UPSModelsDirectory>,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(data: any): Promise<EquipmentCard> {
    return this.equipmentCardRepository.save(data);
  }

  async findCommonData() {
    const data = await this.equipmentCardRepository
      .createQueryBuilder('equipmentCard')
      .leftJoin('equipmentCard.upsModelsDirectory', 'upsModelsDirectory')
      .leftJoin(
        'equipmentCard.otherEquipmentDirectory',
        'otherEquipmentDirectory',
      )
      .leftJoin(
        'upsModelsDirectory.batteriesDirectory',
        'upsBatteriesDirectory',
      )
      .leftJoin(
        'otherEquipmentDirectory.batteriesDirectory',
        'otherBatteriesDirectory',
      )
      .select([
        'equipmentCard',
        'upsModelsDirectory',
        'otherEquipmentDirectory',
        'upsBatteriesDirectory',
        'otherBatteriesDirectory',
      ])
      .getMany();

    const result = data.map((element: any) => {
      const {
        id,
        upsModelsDirectory,
        otherEquipmentDirectory,
        createDate,
        writtenOff,
      } = element;

      const {
        id: directoryId,
        producer,
        model,
        power,
        typeBattery,
        numberOfBatteries,
        yearProductionUPS,
        inventoryNumber,
        s_n,
        apcs,
        batteriesDirectoryId,
        objectsDirectoryId,
        objectLocation,
        dateOfLastBatteryReplacement,
        batteriesDirectory,
      } = upsModelsDirectory || otherEquipmentDirectory || {};

      const { term } = batteriesDirectory;

      const upsModelsDirectoryId = upsModelsDirectory ? directoryId : null;
      const otherEquipmentDirectoryId = otherEquipmentDirectory
        ? directoryId
        : null;

      const today = new Date();
      const year = today.getFullYear();

      return {
        id,
        addId: id,
        upsModelsDirectoryId,
        otherEquipmentDirectoryId,
        batteriesDirectoryId,
        producer,
        model,
        power,
        typeBattery,
        numberOfBatteries,
        term,
        yearProductionUPS,
        inventoryNumber,
        s_n,
        apcs,
        objectLocation,
        writtenOff: writtenOff,
        colorRow:
          writtenOff === 'Списано'
            ? ''
            : year - yearProductionUPS - term === 1
            ? '#f2f29d'
            : year - yearProductionUPS > term
            ? '#f09c9c'
            : '',
      };
    });

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
        .leftJoin(
          'equipmentCardRepository.otherEquipmentDirectory',
          'otherEquipmentDirectory',
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

  async update(data: any) {
    try {
      const { id, writtenOff } = data;

      const result = await this.equipmentCardRepository.update(id, {
        writtenOff: writtenOff,
      });

      if (writtenOff === 'Списано')
        try {
          await this.notificationsService.deleteByNameTableAndId(
            'equipment_card',
            id,
          );
        } catch (error) {
          console.log('Entry not found');
        }

      return result;
    } catch (error) {
      console.error('Update error:', error);
      return false;
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
