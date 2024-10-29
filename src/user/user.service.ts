import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) { }

    async createUser(username: string, email: string, password: string): Promise<User> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return this.userRepository.create({ username, email, password: hashedPassword });
    }


    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async findAll(): Promise<Omit<User, 'password'>[]> {
        const users = await this.userRepository.findAll();
        return users.map(user => {
            const userObj = user.toJSON();
            delete userObj.password;
            return userObj;
        });
    }



    async findOne(id: number): Promise<Omit<User, 'password'> | null> {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            return null;
        }

        const userObj = user.toJSON();
        delete userObj.password;
        return userObj;
    }

    async updateUser(id: number, data: Partial<User>): Promise<void> {
        await this.userRepository.update(id, data);
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.userRepository.findOne(id);
        if (user) {
            await user.destroy();
        }
    }

}
