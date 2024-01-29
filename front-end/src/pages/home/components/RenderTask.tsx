import {
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    Typography,
} from "@mui/material";
import { theme } from "../../../theme";
import { lightGray } from "../../../const/colors";
import { formatDate } from "../../../utils/dateUtils";
import { GetTask, UpdateTaskData } from "../../../types/app-types";

interface IProps {
    task: GetTask;
    type: "todo" | "completed";
    updateTask: (taskData: UpdateTaskData) => void;
}

export default function RenderTask({ task, type, updateTask }: IProps) {
    const label = type === "todo" ? "Mark as completed" : "Mark as todo";

    const onChange = (e: any) => {
        const value = e.target.checked as boolean;
        updateTask({ task: task, value: value });
    };

    return (
        <Grid
            item
            xs={12}
            marginTop={theme.spacing(2)}
            padding={theme.spacing(1)}
            border={`${theme.spacing(0.2)} solid ${lightGray}`}
            borderRadius={1}
        >
            <Typography variant="subtitle2" paddingBottom={theme.spacing(2)}>
                {task.message}
            </Typography>
            <Divider />
            <Box display={"flex"} paddingTop={theme.spacing(2)}>
                <Box>
                    <Typography variant="caption">Created on</Typography>
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
                    <Typography variant="caption">Last updated</Typography>
                    <Typography variant="subtitle2">
                        {formatDate(task.updatedAt)}
                    </Typography>
                </Box>
            </Box>
            <Box>
                <FormControlLabel
                    defaultChecked={task?.completed}
                    control={<Checkbox defaultChecked={task.completed} />}
                    label={label}
                    onChange={onChange}
                />
            </Box>
        </Grid>
    );
}
