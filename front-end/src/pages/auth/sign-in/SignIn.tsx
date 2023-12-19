import { Button, Grid, TextField, Typography } from "@mui/material";
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../theme";
import { signInUser } from "../../../apis/auth";

export default function SignIn() {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm();

    const onSubmitValid: SubmitHandler<FieldValues> = async (data) => {
        if (isSubmitting) return;
        try {
            const res = await signInUser({
                username: data.username,
                password: data.password,
            });
            if (res?.data.token) {
                localStorage.setItem("userToken", res?.data.token);
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmitValid)}>
            <Grid
                container
                spacing={2}
                width={"50%"}
                margin={"auto"}
                justifyContent={"center"}
            >
                <Grid item xs={12} marginTop={theme.spacing(4)}>
                    <Typography variant="h2" textAlign={"center"}>
                        Sign In!
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Controller
                        name="username"
                        control={control}
                        rules={{ required: "Username is required" }}
                        render={({ field: { ref, ...field } }) => (
                            <TextField
                                {...field}
                                inputRef={ref}
                                error={!!errors.username}
                                label="Username"
                                type="text"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: "Password is required" }}
                        render={({ field: { ref, ...field } }) => (
                            <TextField
                                {...field}
                                inputRef={ref}
                                error={!!errors.password}
                                label="Password"
                                type="password"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Button type="submit" variant="contained">
                        Sign In
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
