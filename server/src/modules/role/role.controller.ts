import { Controller, Get, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { Roles } from 'src/entities/roles.entity';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Roles> {
    return this.roleService.findOne(id);
  }
}
