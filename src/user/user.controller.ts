// user.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() body: { username: string; email: string; password: string }): Promise<User> {
        return this.userService.createUser(body.username, body.email, body.password);
    }

    @Get()
    async findAllUsers(): Promise<Partial<User>[]> {
        return this.userService.findAll();
    }


    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() data: Partial<User>): Promise<void> {
        return this.userService.updateUser(id, data);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<void> {
        return this.userService.deleteUser(id);
    }
}
