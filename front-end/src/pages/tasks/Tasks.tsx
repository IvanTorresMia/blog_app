import { Box, Divider } from "@mui/material";
import CreateTask from "./components/CreateTask";
import { theme } from "../../theme";
import RenderTasks from "./components/RenderTask";
import { useEffect, useState } from "react";
import { getAllUserTasks } from "../../apis/app_apis";

import { useAuth } from "../../providers/useAuth";
import { GetTask } from "../../types/app-types";
import { getCurrentUser } from "../../apis/auth";
import { User } from "../../types/auth-types";

export default function Tasks() {
    const [user, setUser] = useState<User | null>();
    const [tasks, setTasks] = useState<GetTask[] | null>(null);

    // TODO: fix the auth context and refactor this to not get user on this file
    const getAllTasks = async (userId: number) => {
        try {
            const res = await getAllUserTasks(userId);
            setTasks(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    const getUser = async () => {
        try {
            const res = await getCurrentUser();
            const userData: User = res.data;
            setUser(userData);
            getAllTasks(userData.userId);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getUser();
    }, []);
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
        >
            <CreateTask
                updateTasks={() => {
                    getAllTasks(user?.userId!);
                }}
            />
            <Box
                width={"58%"}
                margin={"auto"}
                paddingTop={theme.spacing(2)}
                paddingBottom={theme.spacing(2)}
            >
                <Divider />
            </Box>
            {!!tasks &&
                tasks.map((task) => {
                    return (
                        <RenderTasks
                            key={task.todoId}
                            task={task}
                            updateTasks={() => {
                                getAllTasks(user?.userId!);
                            }}
                        />
                    );
                })}
        </Box>
    );
}
