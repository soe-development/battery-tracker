import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRoles } from 'src/entities/users-roles.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    @InjectRepository(UsersRoles)
    private readonly userRoleRepository: Repository<UsersRoles>,
  ) {}

  async create(data: any): Promise<Users> {
    return this.userRepository.save(data);
  }

  async findOne(condition: any): Promise<Users> {
    const user = await this.userRepository.find({
      where: condition,
      relations: ['userRoles', 'userRoles.role'],
    });

    return user[0];
  }
}
