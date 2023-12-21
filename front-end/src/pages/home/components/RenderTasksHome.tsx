import { useEffect, useState } from "react";
import { getAllUserTasks } from "../../../apis/app_apis";
import { User } from "../../../types/auth-types";
import { GetTask } from "../../../types/app-types";
import { Box, Grid, Typography } from "@mui/material";
import { theme } from "../../../theme";
import { lightGray } from "../../../const/colors";

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
    }, []);

    return (
        <Grid container>
            {!!tasks &&
                tasks.map((task) => {
                    return (
                        <Grid
                            item
                            xs={12}
                            marginTop={theme.spacing(2)}
                            padding={theme.spacing(1)}
                            border={`${theme.spacing(0.2)} solid ${lightGray}`}
                        >
                            <Typography variant="subtitle2">
                                {task.message}
                            </Typography>
                            <Box>
                                <Typography variant="caption">
                                    Created on
                                </Typography>
                                <Typography variant="subtitle2">
                                    {task.createdAt}
                                </Typography>
                            </Box>
                        </Grid>
                    );
                })}
        </Grid>
    );
}
