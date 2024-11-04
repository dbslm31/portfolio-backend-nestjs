import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { User } from './user.model';
import { Role } from 'src/roles/roles.model';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository, @InjectModel(Role) private readonly roleModel: typeof Role,) { }

    async createUser(username: string, email: string, password: string): Promise<User> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return this.userRepository.create({ username, email, password: hashedPassword });
    }

    async findByEmail(email: string): Promise<User | null> {
        console.log('Email value in findByEmail:', email); // Ajoutez cette ligne
        return this.userRepository.findByEmail(email, { include: [Role] });
    }



    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email, { include: [Role] });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async assignRole(userId: number, roleId: number): Promise<User> {
        const user = await this.userRepository.findOne(userId);
        if (!user) {

            throw new NotFoundException('User not found');
        }

        const role = await this.roleModel.findByPk(roleId);
        if (!role) {
            throw new NotFoundException('Role not found');
        }

        user.roleId = roleId;
        await user.save();

        return user;
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
