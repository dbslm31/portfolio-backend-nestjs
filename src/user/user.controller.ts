// user.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Post()
    async createUser(@Body() body: { username: string; email: string; password: string }): Promise<User> {
        return this.userService.createUser(body.username, body.email, body.password);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllUsers(): Promise<Partial<User>[]> {
        return this.userService.findAll();
    }


    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() data: Partial<User>): Promise<void> {
        return this.userService.updateUser(id, data);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<void> {
        return this.userService.deleteUser(id);
    }
}
