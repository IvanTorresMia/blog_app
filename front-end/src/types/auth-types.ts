export type CreateUser = {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
};

export type User = {
    createdOn: string;
    firstName: string;
    lastName: string;
    userId: number;
    username: string;
};
