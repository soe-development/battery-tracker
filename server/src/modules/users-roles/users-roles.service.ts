import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRoles } from 'src/entities/users-roles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRolesService {
  constructor(
    @InjectRepository(UsersRoles)
    private usersRolesRepository: Repository<UsersRoles>,
  ) {}

  async create(usersRolesData: Partial<UsersRoles>): Promise<UsersRoles> {
    const usersRoles = this.usersRolesRepository.create(usersRolesData);
    return this.usersRolesRepository.save(usersRoles);
  }
}
