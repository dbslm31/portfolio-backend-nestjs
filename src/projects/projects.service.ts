import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from './projects.repository';
import { Project } from './project.model';


@Injectable()
export class ProjectService {
    constructor(private readonly projectRepository: ProjectRepository) { }

    async createProject(name: string, language: string, tools: string, description: string, startDate: Date, endDate: Date, ownerId: number, isCompleted: boolean): Promise<Project> {
        return await this.projectRepository.create({ name, language, tools, description, startDate, endDate, ownerId, isCompleted });
    }


    async findAll(): Promise<Project[]> {
        return await this.projectRepository.findAll();

    }


    async findOne(id: number): Promise<Project | null> {
        return await this.projectRepository.findOne(id);
    }

    async updateProject(id: number, data: Partial<Project>): Promise<void> {
        await this.projectRepository.update(id, data);
    }

    async deleteProject(id: number): Promise<void> {
        const project = await this.projectRepository.findOne(id);
        if (project) {
            await project.destroy();
        }
    }

}
