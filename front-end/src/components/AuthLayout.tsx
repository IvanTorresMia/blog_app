import { Box } from "@mui/material";
import AppContainer from "./AppContainer";
import { Outlet } from "react-router-dom";
import { theme } from "../theme";

import AuthNav from "./AuthNav";

export default function AuthLayout() {
    return (
        <AppContainer>
            <AuthNav>
                <Box
                    paddingTop={theme.spacing(6)}
                    paddingLeft={theme.spacing(15)}
                    paddingRight={theme.spacing(15)}
                >
                    <Outlet />
                </Box>
            </AuthNav>
        </AppContainer>
    );
}
