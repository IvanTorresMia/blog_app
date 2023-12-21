import { Box, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import { theme } from "../theme";
import { SnackbarProvider } from "notistack";

interface IProps {
    children: ReactNode;
}

export default function AppContainer({ children }: IProps) {
    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <Box
                    display="flex"
                    justifyContent={"space-between"}
                    alignItems="center"
                >
                    {children}
                </Box>
            </SnackbarProvider>
        </ThemeProvider>
    );
}
