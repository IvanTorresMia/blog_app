import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize,
} from "sequelize";

import { User } from "./user";

export class Todo extends Model<
    InferAttributes<Todo>,
    InferCreationAttributes<Todo>
> {
    declare todoId: number;
    declare message: string;
    declare completed: boolean;
    declare userId: number;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

export function TodoFactory(sequelize: Sequelize) {
    Todo.init(
        {
            todoId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            completed: {
                type: DataTypes.BOOLEAN,
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
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
            tableName: "todos",
            sequelize,
        }
    );
}

export function AssociateUserTodos() {
    User.hasMany(Todo, { foreignKey: "userId" });
    Todo.belongsTo(User, { foreignKey: "userId" });
}
