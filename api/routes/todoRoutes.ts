import { Router } from "express";
import {
    createTodo,
    deleteTodo,
    getAllTodos,
    getTodo,
    getTodoByUserId,
    updateTodo,
} from "../controllers/todoController";

const router = Router();

router.get("/", getAllTodos);

router.post("/", createTodo);

router.get("/user/:id", getTodoByUserId);

router.get("/:id", getTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

export default router;
