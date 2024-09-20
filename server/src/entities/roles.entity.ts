import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersRoles } from './users-roles.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  permission: string;

  @OneToMany(() => UsersRoles, (userRole) => userRole.role, { cascade: true })
  userRoles: UsersRoles[];
}
