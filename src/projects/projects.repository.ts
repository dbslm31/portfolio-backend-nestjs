import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from './project.model';

@Injectable()
export class ProjectRepository {
    constructor(@InjectModel(Project) private projectModel: typeof Project) { }


    async create(data: { name: string; language: string; tools: string; description: string; startDate: Date; endDate: Date; ownerId: number; isCompleted: boolean; }): Promise<Project> {
        return this.projectModel.create(data);
    }


    async findAll(): Promise<Project[]> {
        return this.projectModel.findAll();
    }

    async findOne(id: number): Promise<Project | null> {
        return this.projectModel.findOne({ where: { id } });
    }

    async update(id: number, data: Partial<Project>): Promise<void> {
        await this.projectModel.update(data, { where: { id } });
    }

    async delete(id: number): Promise<void> {
        const user = await this.findOne(id);
        if (user) {
            await user.destroy();
        }
    }
}
