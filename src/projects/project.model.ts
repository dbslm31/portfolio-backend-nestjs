import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { User } from 'src/user/user.model';
import { ProjectTag } from 'src/projects_tags/projects_tags.model';
import { Tag } from 'src/tags/tags.model';

@Table
export class Project extends Model<Project> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    language: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    tools: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    startDate: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    endDate: Date;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    ownerId: number;

    @BelongsTo(() => User)
    owner: User;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    })
    isCompleted: boolean;

    @BelongsToMany(() => Tag, () => ProjectTag)
    tags: Tag[];
}


