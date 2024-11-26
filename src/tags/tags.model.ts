import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BelongsToMany } from "sequelize-typescript";
import { Project } from "src/projects/project.model";
import { ProjectTag } from "../projects_tags/projects_tags.model";


@Table({ tableName: 'tags' })
export class Tag extends Model<Tag> {

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    name: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @BelongsToMany(() => Project, () => ProjectTag)
    projects: Project[];

}