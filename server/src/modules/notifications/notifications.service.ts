import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notifications } from 'src/entities/notifications.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notifications)
    private readonly notificationRepository: Repository<Notifications>,
  ) {}

  async create(data: any[]): Promise<boolean> {
    if (!Array.isArray(data) || data.length === 0) {
      return false;
    }

    try {
      const validData = data.filter(
        (item) =>
          item &&
          typeof item.uniqueCode === 'string' &&
          item.uniqueCode.trim() !== '',
      );

      if (validData.length === 0) {
        return false;
      }

      const uniqueCodes = validData.map((item) => item.uniqueCode);

      const existingCodes = await this.notificationRepository.find({
        where: { uniqueCode: In(uniqueCodes) },
        select: ['uniqueCode'],
      });

      const existingCodeSet = new Set(
        existingCodes.map((code) => code.uniqueCode),
      );
      const newNotifications = validData.filter(
        (item) => !existingCodeSet.has(item.uniqueCode),
      );

      if (newNotifications.length > 0) {
        await this.notificationRepository.save(newNotifications);
      }

      return true;
    } catch (error) {
      console.error('Error creating notifications:', error);
      return false;
    }
  }

  async update(data: any[]) {
    return Promise.all(
      data.map(({ id, ...rest }) =>
        this.notificationRepository.update(id, { ...rest }),
      ),
    );
  }

  async find() {
    const data = await this.notificationRepository.find({
      order: { id: 'DESC' },
    });
    return data;
  }

  async deleteByNameTableAndId(table: string, tableId: number) {
    const data = await this.notificationRepository.delete({
      table: table,
      tableId: tableId,
    });

    return data;
  }
}
