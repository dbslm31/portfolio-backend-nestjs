
import { Injectable } from '@nestjs/common';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
    async createRoles() {
        await Role.bulkCreate([
            { name: 'admin' },
            { name: 'client' },
        ]);
    }
}
