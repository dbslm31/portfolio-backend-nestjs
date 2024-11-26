import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProjectTag } from './projects_tags.model';

@Module({
    imports: [SequelizeModule.forFeature([ProjectTag])],
})

export class ProjectsTagsModule { }

