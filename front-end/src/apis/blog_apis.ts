import axios from "axios";
import { UpdateBlog, UpdateTask } from "../types/app-types";
const url = "http://localhost:3072/api/blog/";

export async function createBlog({
    title,
    body,
}: {
    title: string;
    body: string;
}) {
    const userToken = localStorage.getItem("userToken");
    let reqHeaders = {
        Authorization: `Bearer ${userToken}`,
    };

    const data = { title: title, body: body };
    const res = await axios.post(`${url}`, data, {
        headers: reqHeaders,
    });

    if (res.status === 200 || res.status === 201) {
        return res;
    } else {
        throw new Error("unable to post");
    }
}

export async function getAllUserBlogs(id: number) {
    const res = await axios.get(`${url}user/${id}`);
    if (res.status === 200 || res.status === 201) {
        return res;
    } else {
        throw new Error("unable to fetch");
    }
}
export async function getUserBlog(id: number) {
    const res = await axios.get(`${url}${id}`);
    if (res.status === 200 || res.status === 201) {
        return res;
    } else {
        throw new Error("unable to fetch");
    }
}

export async function updateBlog(blog: UpdateBlog, id: number) {
    const res = await axios.put(`${url}${id}`, blog);
    if (res.status === 200 || res.status === 201) {
        return res;
    } else {
        throw new Error("unable to update blog");
    }
}

export async function deleteBlog(id: number) {
    const res = await axios.delete(`${url}${id}`);
    if (res.status === 200 || res.status === 201) {
        return res;
    } else {
        throw new Error("Unable to delete blog");
    }
}
