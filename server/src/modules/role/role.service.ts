import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from 'src/entities/roles.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
  ) {}

  async findOne(condition: any): Promise<Roles> {
    const role = await this.roleRepository.findOne({ where: condition });
    return role;
  }
}
