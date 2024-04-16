import { Sequelize } from "sequelize";
import { UserFactory } from "./user";
import { AssociateUserTodos, TodoFactory } from "./todos";
import { AssociateUserBlogs, BlogFactory } from "./blog";
import * as dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME || "";
const username = process.env.USERNAME || "";
const password = process.env.PASSWORD || "";
const host = process.env.HOST || "";

const sequelize = new Sequelize(dbName, username, password, {
    host: host,
    port: 5432,
    dialect: "postgres",
});

// testing connection that it has been established
const testDbConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log(
            "Connection has been established successfully. There ya go Ivan"
        );
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

testDbConnection();

UserFactory(sequelize);
TodoFactory(sequelize);
BlogFactory(sequelize);
AssociateUserTodos();
AssociateUserBlogs();

export const db = sequelize;
