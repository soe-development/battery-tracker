import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Roles } from './roles.entity';
import { Users } from './users.entity';

@Entity()
export class UsersRoles {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.id)
  user: Users;

  @ManyToOne(() => Roles, (role) => role.id)
  role: Roles;
}
