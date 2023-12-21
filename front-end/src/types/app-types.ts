import { User } from "./auth-types";

export type Task = {
    message: string;
    userId: number;
};

export type GetTask = {
    User: User;
    createdAt: string;
    updatedAt: string;
    message: string;
    todoId: number;
    userId: number;
};

export type UpdateTask = {
    todoId: number;
    message: string;
};
