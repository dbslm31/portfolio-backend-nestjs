import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectsController } from './projects.controller';
import { ProjectService } from './projects.service';
import { ProjectRepository } from './projects.repository';
import { Project } from './project.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Project]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectService, ProjectRepository],
})
export class ProjectsModule { }
