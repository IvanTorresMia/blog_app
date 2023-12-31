import { Router } from "express";
import {
    createBlog,
    deleteBlog,
    getAllBlogs,
    getBlog,
    getBlogByUserId,
    updateBlog,
} from "../controllers/blogController";
const router = Router();

router.get("/", getAllBlogs);

router.post("/", createBlog);

router.get("/user/:id", getBlogByUserId);

router.get("/:id", getBlog);

router.put("/:id", updateBlog);

router.delete("/:id", deleteBlog);

export default router;
