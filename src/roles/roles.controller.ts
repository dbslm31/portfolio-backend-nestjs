import { Controller, Post, Get, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesService } from './roles.service';
import { Role } from './roles.model';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createRole(@Body() body: { name: string }): Promise<Role> {
        return this.rolesService.create({ name: body.name });
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllRoles(): Promise<Role[]> {
        return this.rolesService.findAllRoles();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getRoleById(@Param('id') id: number): Promise<Role> {
        const role = await this.rolesService.findById(id);
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return role;
    }


}
