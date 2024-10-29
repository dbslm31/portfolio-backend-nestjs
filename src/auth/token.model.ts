import { Column, Model, Table, PrimaryKey } from 'sequelize-typescript';

@Table
export class Token extends Model<Token> {
    @PrimaryKey
    @Column
    id: number;

    @Column
    token: string;

    @Column
    userId: number;

    @Column
    expiresAt: Date;
}
