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
    completed: boolean;
    todoId: number;
    userId: number;
};

export type UpdateTask = {
    todoId: number;
    message: string;
    completed: boolean;
};

export type UpdateBlog = {
    blogId: number;
    title: string;
    body: string;
};

export type GetBlog = {
    User: User;
    createdAt: string;
    updatedAt: string;
    title: string;
    body: string;
    blogId: number;
    userId: number;
};

export type UpdateTaskData = {
    task: UpdateTask;
    value: boolean;
};
