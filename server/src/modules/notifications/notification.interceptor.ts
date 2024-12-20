import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EquipmentCardService } from '../general-tables/equipment-card/equipment-card.service';
import { NotificationsService } from './notifications.service';

@Injectable()
export class NotificationsInterceptor implements NestInterceptor {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly equipmentCardService: EquipmentCardService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    try {
      const data = await this.equipmentCardService.findCommonData();

      const equipmentCardNotification = data.map((item: any) => ({
        status: 'unread',
        text:
          item.colorRow === '#f09c9c'
            ? 'Необхідно списати пристрій!'
            : 'Термін роботи закінчується!',
        table: 'equipment_card',
        tableId: item.id,
        severity: item.colorRow === '#f09c9c' ? 'error' : 'warning',
        uniqueCode: `equipment_card_${item.id}`,
        route: 'equipment-card',
      }));

      const result = await this.notificationsService.create(
        equipmentCardNotification,
      );

      if (!result) {
        console.error('Ошибка: уведомления не были сохранены!');
        throw new Error('Ошибка при создании уведомлений');
      }

      return next.handle().pipe(
        map((response) => {
          return response;
        }),
      );
    } catch (error) {
      console.error('Ошибка в интерцепторе:', error.message);
      throw error;
    }
  }
}
