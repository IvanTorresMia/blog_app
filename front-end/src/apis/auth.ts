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

    if (res.status === 200) {
        return res;
    } else if (res.status === 401) {
        // navigate back
    } else {
        throw new Error("Failed to fetch user");
    }
}
