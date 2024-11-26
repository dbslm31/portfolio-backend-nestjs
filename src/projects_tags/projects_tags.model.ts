import { Table, Column, DataType, Model, ForeignKey } from "sequelize-typescript";
import { Project } from "src/projects/project.model";
import { Tag } from "../tags/tags.model";

@Table({
    tableName: 'projects_tags',
    timestamps: true,
    createdAt: true,
    updatedAt: true,
})
export class ProjectTag extends Model<ProjectTag> {
    @ForeignKey(() => Project)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    projectId: number;

    @ForeignKey(() => Tag)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    tagId: number;
}