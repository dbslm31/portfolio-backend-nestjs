import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UseGuards, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Post()
    async createUser(@Body() body: { username: string; email: string; password: string }): Promise<User> {
        return this.userService.createUser(body.username, body.email, body.password);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    @Roles('admin')
    async findAllUsers(): Promise<Omit<User, 'password'>[]> {
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Omit<User, 'password'> | null> {
        return this.userService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() data: Partial<User>): Promise<void> {
        return this.userService.updateUser(id, data);
    }

    @Put(':userId/assignRole')
    async assignRole(
        @Param('userId', ParseIntPipe) userId: number,
        @Body('roleId', ParseIntPipe) roleId: number
    ) {
        try {
            console.log('roleId', roleId)
            const user = await this.userService.assignRole(userId, roleId);
            return { message: 'Role assigned successfully', user };
        } catch (error) {
            if (error instanceof NotFoundException) {
                return { message: error.message };
            }
            throw error;
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<void> {
        return this.userService.deleteUser(id);
    }
}
