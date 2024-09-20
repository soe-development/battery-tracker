import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BatteryReplacement } from 'src/entities/directories/battery-replacement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BatteryReplacementService {
  constructor(
    @InjectRepository(BatteryReplacement)
    private readonly batteryReplacementRepository: Repository<BatteryReplacement>,
  ) {}

  async create(data: any): Promise<BatteryReplacement> {
    return this.batteryReplacementRepository.save(data);
  }

  async update(data: any) {
    const { id, numberOfBatteries } = data;

    return this.batteryReplacementRepository.update(id, {
      numberOfBatteries,
    });
  }

  async findById(id: number) {
    const data = await this.batteryReplacementRepository
      .createQueryBuilder('batteryReplacement')
      .leftJoinAndSelect('batteryReplacement.receipt', 'receipt')
      .select(['batteryReplacement', 'receipt'])
      .where('batteryReplacement.equipmentCardId = :id', { id: id })
      .getMany();

    const result = data.map((element: any) => {
      const { id, typeBattery, numberOfBatteries, createDate, receiptId } =
        element;

      const dateOfLastBatteryReplacement = new Date(createDate)
        .toISOString()
        .split('T')[0];

      return {
        id,
        receiptId,
        dateOfLastBatteryReplacement,
        typeBattery,
        numberOfBatteries,
      };
    });

    return result;
  }

  async delete(id: number) {
    return this.batteryReplacementRepository.delete(id);
  }
}
