import bcrypt from "bcrypt";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

const secret = "todopated";

export const hashPassword = async (planTextPassword: string) => {
    const saltRound = 12;
    const hash = await bcrypt.hash(planTextPassword, saltRound);
    return hash;
};

export const comparePasswords = async (
    planTextPassword: string,
    hashPassword: string
) => {
    return await bcrypt.compare(planTextPassword, hashPassword);
};

export const signUserToken = async (user: User) => {
    let token = jwt.sign({ userId: user.userId }, secret, { expiresIn: "2hr" });
    return token;
};

export const verifyUser = async (req: Request) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];

        try {
            let decoded: any = await jwt.verify(token, secret);
            return User.findByPk(decoded.userId);
        } catch (err) {
            return null;
        }
    } else {
        return null;
    }
};
