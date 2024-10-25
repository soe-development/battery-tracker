import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

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
      request.user = user; // Добавляем данные пользователя в запрос
      return true; // Разрешаем доступ
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
