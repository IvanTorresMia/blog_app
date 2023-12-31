import { Sequelize } from "sequelize";
import { UserFactory } from "./user";
import { AssociateUserTodos, TodoFactory } from "./todos";
import { AssociateUserBlogs, BlogFactory } from "./blog";

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
BlogFactory(sequelize);
AssociateUserTodos();
AssociateUserBlogs();

export const db = sequelize;
