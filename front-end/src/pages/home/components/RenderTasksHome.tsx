import { useEffect, useState } from "react";
import { getAllUserTasks, updateTask } from "../../../apis/app_apis";
import { User } from "../../../types/auth-types";
import { GetTask, UpdateTask, UpdateTaskData } from "../../../types/app-types";
import { Box, Button, Grid, Typography } from "@mui/material";
import { theme } from "../../../theme";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import RenderTask from "./RenderTask";

interface IProps {
    user: User;
}

export default function RenderTasksHome({ user }: IProps) {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<GetTask[] | null>(null);

    const getAllTasks = async (userId: number) => {
        try {
            const res = await getAllUserTasks(userId);
            setTasks(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getAllTasks(user?.userId);
    }, [user?.userId]);

    if (_.isEmpty(tasks) || !tasks) {
        return (
            <Grid
                container
                spacing={2}
                marginTop={theme.spacing(4)}
                marginBottom={theme.spacing(4)}
                textAlign={"center"}
            >
                <Grid item xs={12}>
                    <Typography variant="h1" textAlign={"center"}>
                        There are no tasks created
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        onClick={() => {
                            navigate("/tasks");
                        }}
                        variant="contained"
                    >
                        Create a task
                    </Button>
                </Grid>
            </Grid>
        );
    }

    const handleUpdateTask = async (taskData: UpdateTaskData) => {
        const updatedTask: UpdateTask = {
            todoId: taskData.task.todoId,
            message: taskData.task.message,
            completed: taskData.value,
        };

        try {
            await updateTask(updatedTask, updatedTask.todoId);
            getAllTasks(user?.userId);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Grid container padding={theme.spacing(2)}>
            <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"space-between"}
            >
                <Box width={"45%"}>
                    <Typography variant="subtitle1">Todo</Typography>
                    {!!tasks &&
                        tasks.map((task, i) => {
                            if (!task.completed) {
                                return (
                                    <RenderTask
                                        key={i}
                                        type="todo"
                                        task={task}
                                        updateTask={(taskData) => {
                                            handleUpdateTask(taskData);
                                        }}
                                    />
                                );
                            }
                            return <></>;
                        })}
                </Box>
                <Box width={"45%"}>
                    <Typography variant="subtitle1">Completed</Typography>
                    {!!tasks &&
                        tasks.map((task, i) => {
                            if (task.completed) {
                                return (
                                    <RenderTask
                                        key={i}
                                        type="completed"
                                        task={task}
                                        updateTask={(taskData) => {
                                            handleUpdateTask(taskData);
                                        }}
                                    />
                                );
                            }
                            return <></>;
                        })}
                </Box>
            </Grid>
        </Grid>
    );
}
