import { Sequelize } from "sequelize";
import { UserFactory } from "./user";
import { AssociateUserTodos, TodoFactory } from "./todos";

const dbName = "todo_app";
const username = "root";
const password = "password1";

const sequelize = new Sequelize(dbName, username, password, {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
});

UserFactory(sequelize);
TodoFactory(sequelize);
AssociateUserTodos();

export const db = sequelize;
