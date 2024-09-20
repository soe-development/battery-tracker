import { Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ActiveDirectoryService } from './active-directory.service';
import { AuthService } from './auth.service';
import { RoleService } from '../role/role.service';
import { UsersRolesService } from '../users-roles/users-roles.service';
import { JwtService } from '@nestjs/jwt';

const staticTestUsers = [
  {
    userId: 10,
    username: 'user_1',
    password: '1111',
    name: 'Переглядач загальної таблиці',
    role: {
      id: 10,
      name: 'commonTableViewer',
      permission: '2. View common table;',
    },
  },
  {
    userId: 11,
    username: 'user_2',
    password: '2222',
    name: 'Заповнювач довідників',
    role: {
      id: 11,
      name: 'fillerDirectories',
      permission: '3. Fill dirictories;',
    },
  },
  {
    userId: 12,
    username: 'user_3',
    password: '3333',
    name: 'Заповнювач Карти Обладнання',
    role: {
      id: 12,
      name: 'fillerEquipmentCard',
      permission: '4. Fill equipment card;',
    },
  },
  {
    userId: 13,
    username: 'user_4',
    password: '4444',
    name: 'Замінювач АКБ',
    role: {
      id: 13,
      name: 'replacementerOfBatteries',
      permission: '5. Replace battery;',
    },
  },
];

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adService: ActiveDirectoryService,
    private readonly roleService: RoleService,
    private readonly userRolesService: UsersRolesService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Req() request: any, @Res() response: any) {
    const { username, role } = request.body;

    const findUser = await this.authService.findOne({
      username: username.substring(0, username.indexOf('@')),
    });

    const findRole = await this.roleService.findOne({ name: role });

    if (findUser) {
      response.status(401).json({
        status: 401,
        message: 'This username already exists',
      });
    } else {
      const user = await this.authService.create({
        username: username.substring(0, username.indexOf('@')),
        email: username.substring(0, username.indexOf('@')) + '@soe.com.ua',
      });

      const usersRolesData = {
        user: user,
        role: findRole,
      };

      await this.userRolesService.create(usersRolesData);

      response.status(200).json({
        status: 200,
        message: 'Successful registration',
      });
    }
  }

  @Post('login')
  async login(@Req() request: any, @Res() response: any) {
    try {
      const { login, password } = request.body;

      const user = staticTestUsers.find(
        (u) => u.username === login && u.password === password,
      );

      if (user) {
        await this.authenticateUser(
          response,
          user.userId,
          user.name,
          user.username,
          user.role,
        );
        return;
      }

      this.adService.setCredentials(login, password);
      const userInAD = await this.adService.getUser();

      if (!userInAD) {
        return response
          .status(401)
          .json({ status: 401, message: 'Authentication failed' });
      }

      const localUsername = login.includes('@')
        ? login.substring(0, login.indexOf('@'))
        : login;

      const userInLocalDB = await this.authService.findOne({
        username: localUsername,
      });

      if (userInLocalDB) {
        await this.authenticateUser(
          response,
          userInLocalDB.id,
          userInAD[0].name,
          localUsername,
          userInLocalDB.userRoles[0].role,
        );
      } else {
        return response
          .status(401)
          .json({ status: 401, message: 'Authentication failed' });
      }
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ status: 500, message: 'Internal server error' });
    }
  }

  private async authenticateUser(
    response: any,
    userId: number,
    name: string,
    username: string,
    role: any,
  ) {
    const jwt = await this.jwtService.signAsync({
      userId,
      name,
      username,
      role,
    });

    response.cookie('jwt-btracker', jwt, {
      httpOnly: true,
      domain: process.env.SERVER_HOST,
      secure: true,
      sameSite: 'lax',
      path: '/',
    });

    return response.status(200).json({
      status: 200,
      message: 'Authentication successful',
      jwtToken: jwt,
      user: {
        name,
        username,
        userId,
      },
      route: 'cabinet',
    });
  }

  @Get('user')
  async user(@Req() request: any, @Res() response: any) {
    try {
      const dataToken = await this.jwtService.verifyAsync(
        request.cookies['jwt-btracker'],
      );

      if (!dataToken) {
        response.status(401).json({ status: 401, message: 'Not authorized' });
      } else {
        const { userId, name, username, role } = dataToken;
        response.status(200).json({
          status: 200,
          user: {
            userId: userId,
            name: name,
            username: username,
            role: role,
          },
        });
      }
    } catch (error) {
      response.status(401).json({ status: 401, message: 'Not authorized' });
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: any) {
    response.cookie('jwt-btracker', '', {
      httpOnly: true,
      secure: true,
      domain: process.env.SERVER_HOST,
      path: '/',
      sameSite: 'lax',
      expires: new Date(0),
    });

    return response.status(200).json({
      status: 200,
      message: 'Logout successful',
    });
  }
}
