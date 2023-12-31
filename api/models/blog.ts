import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
} from "sequelize";

import { User } from "./user";

export class Blog extends Model<
    InferAttributes<Blog>,
    InferCreationAttributes<Blog>
> {
    declare blogId: number;
    declare title: string;
    declare body: string;
    declare userId: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}
// in this model we are able to create a new blog with a limit of 400 words
export function BlogFactory(sequelize: Sequelize) {
    Blog.init(
        {
            blogId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            title: { type: DataTypes.STRING, allowNull: false, unique: true },
            body: {
                type: DataTypes.TEXT("long"),
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            freezeTableName: true,
            tableName: "blogs",
            sequelize,
        }
    );
}

export function AssociateUserBlogs() {
    User.hasMany(Blog, { foreignKey: "userId" });
    Blog.belongsTo(User, { foreignKey: "userId" });
}
