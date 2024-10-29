import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User) private userModel: typeof User) { }


    async create(data: { username: string; email: string; password: string }): Promise<User> {
        return this.userModel.create(data);
    }


    async findByEmail(email: string, options?: any): Promise<User | null> {
        return this.userModel.findOne({ where: { email }, ...options });
    }


    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async findOne(id: number): Promise<User | null> {
        return this.userModel.findOne({ where: { id } });
    }

    async update(id: number, data: Partial<User>): Promise<void> {
        await this.userModel.update(data, { where: { id } });
    }

    async delete(id: number): Promise<void> {
        const user = await this.findOne(id);
        if (user) {
            await user.destroy();
        }
    }
}
