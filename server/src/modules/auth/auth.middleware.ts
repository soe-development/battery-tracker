import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NotificationsController } from '../notifications/notifications.controller';
import { EquipmentCardService } from '../general-tables/equipment-card/equipment-card.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly notificationsService: NotificationsService,
    private readonly equipmentCardService: EquipmentCardService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const token = request.cookies['jwt-btracker'];

    if (!token) {
      response.cookie('jwt-btracker', '', {
        httpOnly: true,
        secure: false,
        domain: process.env.SERVER_HOST,
        path: '/',
        sameSite: 'lax',
        expires: new Date(0),
      });
      throw new UnauthorizedException('Authorization token missing');
    }

    try {
      const user = await this.jwtService.verifyAsync(token);
      request.user = user;

      await this.createNotifications();

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async createNotifications() {
    try {
      const data = await this.equipmentCardService.findCommonData();

      const equipmentCardNotification = data.map((item: any) => {
        if (item.writtenOff === 'Дійсне')
          return {
            status: 'unread',
            text:
              item.colorRow === '#f09c9c'
                ? 'Необхідно списати пристрій! Перевірте таблицю "Картка обладнання" запис №'
                : 'Термін роботи закінчується! Перевірте таблицю "Картка обладнання" запис №',
            table: 'equipment_card',
            tableId: item.id,
            severity: item.colorRow === '#f09c9c' ? 'error' : 'warning',
            uniqueCode: `equipment_card_${item.id}`,
            route: 'equipment-card',
          };
      });

      return await this.notificationsService.create(equipmentCardNotification);
    } catch (error) {
      console.error('Ошибка в интерцепторе:', error.message);
      throw error;
    }
  }
}
