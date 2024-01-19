import { useEffect, useState } from "react";
import { getAllUserTasks } from "../../../apis/app_apis";
import { User } from "../../../types/auth-types";
import { GetTask } from "../../../types/app-types";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { theme } from "../../../theme";
import { lightGray } from "../../../const/colors";
import { formatDate } from "../../../utils/dateUtils";
import _ from "lodash";

interface IProps {
    user: User;
}

export default function RenderTasksHome({ user }: IProps) {
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
            <Grid container padding={theme.spacing(4)}>
                <Grid item xs={12}>
                    <Typography variant="h1" textAlign={"center"}>
                        There are no tasks created
                    </Typography>
                </Grid>
            </Grid>
        );
    }

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
                            console.log(task);
                            if (!task.completed) {
                                return (
                                    <Grid
                                        key={i}
                                        item
                                        xs={12}
                                        marginTop={theme.spacing(2)}
                                        padding={theme.spacing(1)}
                                        border={`${theme.spacing(
                                            0.2
                                        )} solid ${lightGray}`}
                                        borderRadius={1}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            paddingBottom={theme.spacing(2)}
                                        >
                                            {task.message}
                                        </Typography>
                                        <Divider />
                                        <Box
                                            display={"flex"}
                                            paddingTop={theme.spacing(2)}
                                        >
                                            <Box>
                                                <Typography variant="caption">
                                                    Created on
                                                </Typography>
                                                <Typography variant="subtitle2">
                                                    {formatDate(task.createdAt)}
                                                </Typography>
                                            </Box>
                                            <Box
                                                paddingRight={theme.spacing(2)}
                                                paddingLeft={theme.spacing(2)}
                                            >
                                                <Divider orientation="vertical" />
                                            </Box>
                                            <Box>
                                                <Typography variant="caption">
                                                    Last updated
                                                </Typography>
                                                <Typography variant="subtitle2">
                                                    {formatDate(task.updatedAt)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
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
                                    <Grid
                                        key={i}
                                        item
                                        xs={12}
                                        marginTop={theme.spacing(2)}
                                        padding={theme.spacing(1)}
                                        border={`${theme.spacing(
                                            0.2
                                        )} solid ${lightGray}`}
                                        borderRadius={1}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            paddingBottom={theme.spacing(2)}
                                        >
                                            {task.message}
                                        </Typography>
                                        <Divider />
                                        <Box
                                            display={"flex"}
                                            paddingTop={theme.spacing(2)}
                                        >
                                            <Box>
                                                <Typography variant="caption">
                                                    Created on
                                                </Typography>
                                                <Typography variant="subtitle2">
                                                    {formatDate(task.createdAt)}
                                                </Typography>
                                            </Box>
                                            <Box
                                                paddingRight={theme.spacing(2)}
                                                paddingLeft={theme.spacing(2)}
                                            >
                                                <Divider orientation="vertical" />
                                            </Box>
                                            <Box>
                                                <Typography variant="caption">
                                                    Last updated
                                                </Typography>
                                                <Typography variant="subtitle2">
                                                    {formatDate(task.updatedAt)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                );
                            }
                            return <></>;
                        })}
                </Box>
            </Grid>
        </Grid>
    );
}
