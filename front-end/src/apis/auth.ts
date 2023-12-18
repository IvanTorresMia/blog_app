import { CreateUser } from "../types/auth-types";

const url = "https://localhost:3072/";

export async function signInUser({
    username,
    password,
}: {
    username: string;
    password: string;
}) {
    const res = await fetch(`${url}api/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
    });

    if (res.status === 200) {
        return res.json();
    } else if (res.status === 401) {
        // navigate back
    } else {
        throw new Error("Failed to fetch user");
    }
}
