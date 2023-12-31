import { Button, Grid, TextField, Typography } from "@mui/material";
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { createBlog } from "../../../apis/blog_apis";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmitValid: SubmitHandler<FieldValues> = async (data) => {
        if (isSubmitting) return;
        try {
            await createBlog({ title: data.title, body: data.body });
            navigate("/blog");
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmitValid)}>
            <Grid container spacing={2} justifyContent={"center"}>
                <Grid item xs={7}>
                    <Typography variant="subtitle2">Create a blog</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: "Title is required" }}
                        render={({ field: { ref, ...field } }) => (
                            <TextField
                                {...field}
                                inputRef={ref}
                                error={!!errors.title}
                                label="Title"
                                type="text"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={7}>
                    <Controller
                        name="body"
                        control={control}
                        rules={{ required: "Body is required" }}
                        render={({ field: { ref, ...field } }) => (
                            <TextField
                                {...field}
                                inputRef={ref}
                                error={!!errors.body}
                                rows={30}
                                multiline
                                label="Body"
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
                        Submit Blog
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
