// role.entity.ts
import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table
export class Role extends Model<Role> {
    @Column
    name: string;

    @HasMany(() => User)
    users: User[];
}
