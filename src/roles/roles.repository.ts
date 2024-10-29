// role.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesRepository {
    constructor(@InjectModel(Role) private roleModel: typeof Role) { }

    async create(data: { name: string }): Promise<Role> {
        return this.roleModel.create(data);
    }

    async findAll(): Promise<Role[]> {
        return this.roleModel.findAll();
    }

    async findById(id: number): Promise<Role | null> {
        return this.roleModel.findByPk(id);
    }

    async delete(id: number): Promise<void> {
        const role = await this.findById(id);
        if (role) {
            await role.destroy();
        }
    }
}
