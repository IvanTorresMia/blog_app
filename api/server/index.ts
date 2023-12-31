import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import { db } from "../models";
import userRoutes from "../routes/userRoutes";
import todoRoutes from "../routes/todoRoutes";
import blogRoutes from "../routes/blogRoutes";

const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/blog", blogRoutes);

const server = http.createServer(app);

db.sync({ alter: true }).then(() => {
    console.info("connected to DB!");
});

server.listen(3072, () => {
    console.log("Server Running one 3072");
});
