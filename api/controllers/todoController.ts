import { RequestHandler } from "express";
import { Todo } from "../models/todos";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";

export const getAllTodos: RequestHandler = async (req, res, next) => {
    let todos = await Todo.findAll({
        include: { model: User },
    });
    res.status(200).json(todos);
};

export const createTodo: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let newTodo: Todo = req.body;
    newTodo.userId = user.userId;

    if (newTodo.message) {
        try {
            let created = await Todo.create(newTodo);
            res.status(201).json(created);
        } catch (err) {
            console.log(err);
        }
    } else {
        res.status(400).send();
    }
};

export const getTodo: RequestHandler = async (req, res, next) => {
    let todoId = req.params.id;
    let todoFound = await Todo.findByPk(todoId, {
        include: { model: User },
    });
    if (todoFound) {
        res.status(200).json(todoFound);
    } else {
        res.status(404).json({});
    }
};

export const getTodoByUserId: RequestHandler = async (req, res, next) => {
    let userId = req.params.id;
    let todos = await Todo.findAll({
        include: { model: User },
        where: { userId: userId },
    });

    res.status(200).json(todos);
};

export const updateTodo: RequestHandler = async (req, res, next) => {
    let todoId = req.params.id;
    let newTodo: Todo = req.body;

    let todoFound = await Todo.findByPk(todoId);

    if (todoFound && todoFound.todoId == newTodo.todoId && newTodo.message) {
        await Todo.update(newTodo, {
            where: { todoId: todoId },
        });
        res.status(200).json();
    } else {
        res.status(400).json();
    }
};

export const deleteTodo: RequestHandler = async (req, res, next) => {
    let todoId = req.params.id;
    let todoFound = await Todo.findByPk(todoId);

    if (todoFound) {
        await Todo.destroy({
            where: { todoId: todoId },
        });
        res.status(200).json();
    } else {
        res.status(404).json();
    }
};
