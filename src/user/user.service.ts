import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) { }

    async createUser(username: string, email: string, password: string): Promise<User> {
        return this.userModel.create({ username, email, password });
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findOne({ where: { id } });
    }

    async updateUser(id: string, data: Partial<User>): Promise<void> {
        await this.userModel.update(data, { where: { id } });
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.findOne(id);
        await user.destroy();
    }
}
