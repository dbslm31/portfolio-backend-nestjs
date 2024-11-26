import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UseGuards, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ProjectService } from './projects.service';
import { Project } from './project.model';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @Roles('admin')
    async createProject(@Body() body: { name: string, language: string, tools: string, description: string, startDate: Date, endDate: Date, ownerId: number, isCompleted: boolean }): Promise<Project> {
        return this.projectService.createProject(body.name, body.language, body.tools, body.description, body.startDate, body.endDate, body.ownerId, body.isCompleted);
    }

    @Get()
    async findAllProject(): Promise<Project[]> {
        return this.projectService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Project | null> {
        return this.projectService.findOne(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    @Roles('admin')
    async updateProject(@Param('id') id: number, @Body() data: Partial<Project>): Promise<void> {
        return this.projectService.updateProject(id, data);
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @Roles('admin')
    async deleteProjet(@Param('id') id: number): Promise<void> {
        return this.projectService.deleteProject(id);
    }
}
