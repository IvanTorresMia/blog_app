import { RequestHandler } from "express";
import { Blog } from "../models/blog";
import { User } from "../models/user";
import { verifyUser } from "../services/auth";

export const getAllBlogs: RequestHandler = async (req, res, net) => {
    let blogs = await Blog.findAll({
        include: { model: User },
    });
    res.status(200).json(blogs);
};

export const createBlog: RequestHandler = async (req, res, next) => {
    let user: User | null = await verifyUser(req);
    console.log("hello user");
    if (!user) {
        return res.status(403).send();
    }

    let newBlog: Blog = req.body;
    newBlog.userId = user.userId;

    if (newBlog.body && newBlog.title) {
        try {
            let created = await Blog.create(newBlog);
            res.status(201).json(created);
        } catch (err) {
            console.log(err);
        }
    } else {
        res.status(400).send();
    }
};

export const getBlog: RequestHandler = async (req, res, next) => {
    let blogId = req.params.id;
    let blogFound = await Blog.findByPk(blogId, {
        include: { model: User },
    });

    if (blogFound) {
        res.status(200).json(blogFound);
    } else {
        res.status(404).json({});
    }
};

export const getBlogByUserId: RequestHandler = async (req, res, next) => {
    let userId = req.params.id;
    let blogs = await Blog.findAll({
        include: { model: User },
        where: { userId: userId },
    });

    res.status(200).json(blogs);
};

export const updateBlog: RequestHandler = async (req, res, next) => {
    let blogId = req.params.id;
    let newBlog: Blog = req.body;

    let blogFound = await Blog.findByPk(blogId);

    if (
        blogFound &&
        blogFound.blogId === newBlog.blogId &&
        newBlog.body &&
        newBlog.title
    ) {
        await Blog.update(newBlog, {
            where: { blogId: blogId },
        });
        res.status(200).json();
    } else {
        res.status(400).json();
    }
};

export const deleteBlog: RequestHandler = async (req, res, next) => {
    let blogId = req.params.id;
    let blogFound = await Blog.findByPk(blogId);

    if (blogFound) {
        await Blog.destroy({
            where: { blogId: blogId },
        });
    } else {
        res.status(404).json();
    }
};
