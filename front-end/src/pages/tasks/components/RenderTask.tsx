import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { GetTask, Task, UpdateTask } from "../../../types/app-types";
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { theme } from "../../../theme";
import { deleteTask, updateTask } from "../../../apis/app_apis";

interface IProps {
    task: GetTask | null;
    updateTasks: () => void;
}

export default function RenderTasks({ task, updateTasks }: IProps) {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmitValid: SubmitHandler<FieldValues> = async (data) => {
        if (isSubmitting) return;
        const updatedTask: UpdateTask = {
            todoId: task?.todoId!,
            message: data.task,
            completed: data.completed ? data.completed : false,
        };

        try {
            await updateTask(updatedTask, task?.todoId!);
            updateTasks();
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTask(task?.todoId!);
            updateTasks();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitValid)}>
            <Grid
                container
                spacing={2}
                justifyContent={"center"}
                marginBottom={theme.spacing(3)}
            >
                <Grid item xs={7}>
                    <Typography variant="subtitle2">Create a task</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Controller
                        name="task"
                        control={control}
                        defaultValue={task?.message}
                        rules={{ required: "Update Required" }}
                        render={({ field: { ref, ...field } }) => (
                            <TextField
                                {...field}
                                inputRef={ref}
                                error={!!errors.task}
                                label="Task"
                                type="text"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid
                    item
                    xs={7}
                    display={"flex"}
                    justifyContent={"space-between"}
                >
                    <Controller
                        name="completed"
                        control={control}
                        defaultValue={task?.completed}
                        render={({ field: { ref, ...field } }) => (
                            <FormControlLabel
                                defaultChecked={task?.completed}
                                inputRef={ref}
                                {...field}
                                control={<Checkbox />}
                                label="Mark as completed"
                            />
                        )}
                    />
                    <Box>
                        <Button
                            type="submit"
                            variant="text"
                            style={{
                                textTransform: "none",
                                marginRight: theme.spacing(2),
                            }}
                        >
                            Update Task
                        </Button>
                        <Button
                            variant="outlined"
                            style={{ textTransform: "none" }}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
}
