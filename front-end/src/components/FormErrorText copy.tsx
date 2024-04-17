import { Box, FormHelperText, FormHelperTextProps } from "@mui/material";

interface IProps {
    errorMessage?: string | null;
    FormHelperTextProps?: FormHelperTextProps;
}

/**
 * Wrapper for FormHelperText that always takes up vertical space
 * but is only visible when there is an error message.
 * This helps prevent the page from jumping around on error
 */
export default function FormInvalidText({ errorMessage }: IProps) {
    return (
        <Box visibility={errorMessage ? "visible" : "hidden"}>
            <FormHelperText error={!!errorMessage}>
                {errorMessage ?? " "}
            </FormHelperText>
        </Box>
    );
}
