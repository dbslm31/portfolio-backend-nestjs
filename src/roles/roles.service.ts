import { Injectable, NotFoundException } from '@nestjs/common';
import { RolesRepository } from './roles.repository';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
    constructor(private readonly roleRepository: RolesRepository) { }


    async createDefaultRoles() {
        await this.roleRepository.create({ name: 'admin' });
        await this.roleRepository.create({ name: 'client' });
    }


    async create(roleData: { name: string }): Promise<Role> {
        return this.roleRepository.create(roleData);
    }


    async findAllRoles(): Promise<Role[]> {
        return this.roleRepository.findAll();
    }


    async findById(id: number): Promise<Role> {
        const role = await this.roleRepository.findById(id);
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return role;
    }
}
