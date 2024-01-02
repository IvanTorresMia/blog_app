import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { createNewTask } from "../../../apis/app_apis";
import { useEffect } from "react";

interface IProps {
    updateTasks: () => void;
}

export default function CreateTask({ updateTasks }: IProps) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm();

    const onSubmitValid: SubmitHandler<FieldValues> = async (data) => {
        if (isSubmitting) return;

        const dataFormatted = {
            message: data.task,
            completed: false,
        };

        try {
            await createNewTask({
                message: dataFormatted.message,
                completed: dataFormatted.completed,
            });
            updateTasks();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        reset({
            task: "",
        });
    }, [isSubmitSuccessful]);

    return (
        <form onSubmit={handleSubmit(onSubmitValid)}>
            <Grid container spacing={2} justifyContent={"center"}>
                <Grid item xs={7}>
                    <Typography variant="subtitle2">Create a task</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Controller
                        name="task"
                        control={control}
                        rules={{ required: "Task is required" }}
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
                <Grid item xs={7}>
                    <Button
                        type="submit"
                        variant="contained"
                        style={{ textTransform: "none" }}
                    >
                        Add new task
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
