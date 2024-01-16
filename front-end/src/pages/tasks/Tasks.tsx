import { Box, Divider } from "@mui/material";
import CreateTask from "./components/CreateTask";
import { theme } from "../../theme";
import RenderTasks from "./components/RenderTask";
import { useEffect, useState } from "react";
import { getAllUserTasks } from "../../apis/app_apis";
import { useAuth } from "../../providers/useAuth";
import { GetTask } from "../../types/app-types";

export default function Tasks() {
    const [tasks, setTasks] = useState<GetTask[] | null>(null);
    const user = useAuth();

    const getAllTasks = async (userId: number) => {
        try {
            const res = await getAllUserTasks(userId);
            setTasks(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (user.user?.userId) {
            getAllTasks(user.user?.userId);
        }
    }, [user.user?.userId]);
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
        >
            <CreateTask
                updateTasks={() => {
                    getAllTasks(user.user?.userId!);
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
                                getAllTasks(user.user?.userId!);
                            }}
                        />
                    );
                })}
        </Box>
    );
}
