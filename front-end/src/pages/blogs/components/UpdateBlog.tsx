import { Button, Grid, TextField, Typography } from "@mui/material";
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";

import { useLocation, useNavigate } from "react-router-dom";
import { updateBlog } from "../../../apis/blog_apis";
import { useState } from "react";
import { GetBlog } from "../../../types/app-types";
import { grayColor } from "../../../const/colors";
import { theme } from "../../../theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function UpdateBlog() {
    const navigate = useNavigate();
    const location = useLocation();
    const [blog, setBlog] = useState<GetBlog | null>(null);
    const {
        control,
        handleSubmit,

        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmitValid: SubmitHandler<FieldValues> = async (data) => {
        if (isSubmitting) return;
        const blogId = location.state.blogId;
        try {
            await updateBlog(
                { title: data.title, body: data.body, blogId: blogId },
                blogId
            );
            navigate("/blog");
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmitValid)}>
            <Grid container spacing={2} justifyContent={"center"}>
                <Grid item xs={12}>
                    <Button
                        style={{ textTransform: "none" }}
                        onClick={() => navigate(-1)}
                    >
                        <ArrowBackIcon
                            fontSize="small"
                            style={{ color: grayColor }}
                        />
                        <Typography
                            marginLeft={theme.spacing(1)}
                            color={grayColor}
                            variant="body2"
                        >
                            Back to home
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs={7}>
                    <Typography variant="subtitle2">Update blog</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Controller
                        name="title"
                        control={control}
                        defaultValue={location.state.title}
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
                        defaultValue={location.state.body}
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
