import { Box, FormHelperText, FormHelperTextProps } from "@mui/material";

interface IProps {
    errorMessage?: string | null;
    FormHelperTextProps?: FormHelperTextProps;
}

export default function FormInvalidText({ errorMessage }: IProps) {
    return (
        <Box visibility={errorMessage ? "visible" : "hidden"}>
            <FormHelperText error={!!errorMessage}>
                {errorMessage ?? " "}
            </FormHelperText>
        </Box>
    );
}
