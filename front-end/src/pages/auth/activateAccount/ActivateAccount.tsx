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
import { createUser } from "../../../apis/auth";
import { theme } from "../../../theme";
import { useState } from "react";

export default function ActivateAccount() {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmitValid: SubmitHandler<FieldValues> = async (data) => {
        if (isSubmitting) return;
        const userData = {
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
        };

        try {
            await createUser(userData);
            navigate("/sign-in");
        } catch (e) {
            console.log(e);
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
                            Create Account!
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
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
                    <Grid item xs={6}>
                        <Controller
                            name="firstName"
                            control={control}
                            rules={{ required: "First name is required" }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    inputRef={ref}
                                    error={!!errors.firstName}
                                    label="First Name"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Controller
                            name="lastName"
                            control={control}
                            rules={{ required: "Last name is required" }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    inputRef={ref}
                                    error={!!errors.lastName}
                                    label="Last Name"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
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
                    <Grid item xs={12} display={"flex"}>
                        <Button
                            color="primary"
                            type="submit"
                            variant="contained"
                        >
                            Create Account
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
