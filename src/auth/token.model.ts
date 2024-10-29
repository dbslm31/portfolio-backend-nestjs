import { Column, Model, Table, PrimaryKey, AutoIncrement, DataType, AllowNull } from 'sequelize-typescript';

@Table
export class Token extends Model<Token> {


    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    token: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    expiresAt: Date;
}
