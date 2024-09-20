import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsersRoles } from './users-roles.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => UsersRoles, (userRole) => userRole.user, { cascade: true })
  userRoles: UsersRoles[];

  get role(): string {
    return this.userRoles[0]?.role?.name;
  }
}
