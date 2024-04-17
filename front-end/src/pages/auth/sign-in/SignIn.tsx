import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    TextField,
    ThemeProvider,
    Typography,
} from "@mui/material";
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../theme";
import { signInUser } from "../../../apis/auth";
import { useState } from "react";
import { AxiosError } from "axios";
import FormInvalidText from "../../../components/FormErrorText";

export default function SignIn() {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
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
            } else {
            }
        } catch (err) {
            const error = err as AxiosError;
            if (error.response?.data) {
                setError(error.response.data as string);
            }
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit(onSubmitValid)}>
                <Grid
                    container
                    spacing={2}
                    width={"50%"}
                    margin={"auto"}
                    justifyContent={"center"}
                >
                    <Grid item xs={12} marginTop={theme.spacing(4)}>
                        <Typography variant="h1" textAlign={"center"}>
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
                                    type={showPass ? "text" : "password"}
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    {!!error && (
                        <Grid item xs={8} textAlign={"center"}>
                            <FormInvalidText errorMessage={error} />
                        </Grid>
                    )}
                    <Grid item xs={8} display={"flex"}>
                        <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                        >
                            Sign In
                        </Button>
                        <Box marginLeft={theme.spacing(2)}>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="see password"
                                onChange={() => {
                                    setShowPass(!showPass);
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </ThemeProvider>
    );
}
