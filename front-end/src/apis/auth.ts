import axios from "axios";
import { CreateUser } from "../types/auth-types";

const url = "http://localhost:3072/";

export async function signInUser({
    username,
    password,
}: {
    username: string;
    password: string;
}) {
    const res = await axios.post(`${url}api/user/login`, {
        username: username,
        password: password,
    });

    if (res.status === 200 || res.status === 201) {
        return res;
    } else {
        throw new Error("Failed to fetch user");
    }
}

export async function getCurrentUser() {
    const userToken = localStorage.getItem("userToken");
    let reqHeaders = {
        Authorization: `Bearer ${userToken}`,
    };

    const res = await axios.get(`${url}api/user/current`, {
        headers: reqHeaders,
    });

    if (res.status === 200 || res.status === 201) {
        return res;
    } else if (res.status === 401) {
        throw new Error("unauthorized");
    } else {
        throw new Error("unable to fetch current user");
    }
}

export async function createUser(data: CreateUser) {
    const res = await axios.post(`${url}api/user`, data);

    if (res.status === 200 || res.status === 201) {
        return res;
    } else {
        throw new Error("Failed to create user");
    }
}
