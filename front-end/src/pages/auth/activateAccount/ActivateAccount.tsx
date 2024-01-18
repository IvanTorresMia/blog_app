import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormHelperText,
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
import { useMemo, useState } from "react";
import FormInvalidText from "../../../components/FormErrorText";
import { greenColor, redColor } from "../../../const/colors";

interface IPasswordStrength {
    atLeast8Char: boolean;
    atLeast1UppercaseLetters: boolean;
    atLeast1Number: boolean;
}

export default function ActivateAccount() {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, touchedFields },
        watch,
    } = useForm({
        defaultValues: {
            username: "",
            firstName: "",
            lastName: "",
            password: "",
            passwordVerify: "",
        },
        mode: "onChange",
    });

    const onSubmitValid: SubmitHandler<FieldValues> = async ({
        username,
        firstName,
        lastName,
        password,
    }) => {
        if (isSubmitting) return;
        const userData = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            password: password,
        };

        try {
            await createUser(userData);
            navigate("/sign-in");
        } catch (e) {
            console.log(e);
        }
    };

    const password = watch("password");
    const passwordStrength: IPasswordStrength = useMemo(
        () => ({
            atLeast8Char: password.length >= 8,
            atLeast1UppercaseLetters: /[A-Z]/.test(password),
            atLeast1Number: /[0-9]/.test(password),
        }),
        [password]
    );

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
                        <FormInvalidText
                            errorMessage={errors.username?.message}
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
                        <FormInvalidText
                            errorMessage={errors.firstName?.message}
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
                        <FormInvalidText
                            errorMessage={errors.lastName?.message}
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
                        <FormInvalidText
                            errorMessage={errors.password?.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {passwordStrength.atLeast8Char ? (
                            <FormHelperText style={{ color: greenColor }}>
                                Contains at least 8 characters
                            </FormHelperText>
                        ) : (
                            <FormHelperText
                                style={{
                                    color: touchedFields.password
                                        ? redColor
                                        : undefined,
                                }}
                            >
                                Contains at least 8 characters
                            </FormHelperText>
                        )}

                        {passwordStrength.atLeast1UppercaseLetters ? (
                            <FormHelperText style={{ color: greenColor }}>
                                Contains at least 1 uppercase character
                            </FormHelperText>
                        ) : (
                            <FormHelperText
                                style={{
                                    color: touchedFields.password
                                        ? redColor
                                        : undefined,
                                }}
                            >
                                Contains at least 1 uppercase character
                            </FormHelperText>
                        )}

                        {passwordStrength.atLeast1Number ? (
                            <FormHelperText style={{ color: greenColor }}>
                                Contains at least 1 number
                            </FormHelperText>
                        ) : (
                            <FormHelperText
                                style={{
                                    color: touchedFields.password
                                        ? redColor
                                        : undefined,
                                }}
                            >
                                Contains at least 1 number
                            </FormHelperText>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                            name="passwordVerify"
                            control={control}
                            rules={{
                                required: "Passwords must match",
                                validate: (value, { password }) =>
                                    value === password || "Password must match",
                            }}
                            render={({ field: { ref, ...field } }) => (
                                <TextField
                                    {...field}
                                    inputRef={ref}
                                    error={!!errors.passwordVerify}
                                    label="Verify password"
                                    type="password"
                                    variant="outlined"
                                    autoComplete="new-password"
                                    fullWidth
                                />
                            )}
                        />
                        <FormInvalidText
                            errorMessage={errors.passwordVerify?.message}
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
