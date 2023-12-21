import axios from "axios";
import { UpdateTask } from "../types/app-types";
const url = "http://localhost:3072/";

export async function createNewTask({ message }: { message: string }) {
    const userToken = localStorage.getItem("userToken");
    let reqHeaders = {
        Authorization: `Bearer ${userToken}`,
    };

    const data = { message: message };
    const res = await axios.post(`${url}api/todo/`, data, {
        headers: reqHeaders,
    });

    if (res.status === 200 || res.status === 201) {
        return res;
    } else {
        throw new Error("unable to post");
    }
}

export async function getAllUserTasks(id: number) {
    const res = await axios.get(`${url}api/todo/user/${id}`);
    if (res.status === 200 || res.status === 201) {
        return res;
    } else {
        throw new Error("unable to fetch");
    }
}

export async function updateTask(task: UpdateTask, id: number) {
    const res = await axios.put(`${url}api/todo/${id}`, task);
    if (res.status === 200 || res.status === 201) {
        return res;
    } else {
        throw new Error("unable to update task");
    }
}

export async function deleteTask(id: number) {
    const res = await axios.delete(`${url}api/todo/${id}`);
    if (res.status === 200 || res.status === 201) {
        return res;
    } else {
        throw new Error("Unable to delete task");
    }
}
