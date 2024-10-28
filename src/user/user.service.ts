import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) { }

    async createUser(username: string, email: string, password: string): Promise<User> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return this.userModel.create({ username, email, password: hashedPassword });
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userModel.findOne({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
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
