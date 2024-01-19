import { Box } from "@mui/material";
import AppContainer from "./AppContainer";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import { useEffect } from "react";
import { theme } from "../theme";
import { AuthProvider } from "../providers/useAuth";

export default function Layout() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            navigate("/auth/sign-in");
        }
    }, [navigate]);

    return (
        <AppContainer>
            <AuthProvider>
                <Navigation>
                    <Box
                        paddingTop={theme.spacing(6)}
                        paddingLeft={theme.spacing(15)}
                        paddingRight={theme.spacing(15)}
                    >
                        <Outlet />
                    </Box>
                </Navigation>
            </AuthProvider>
        </AppContainer>
    );
}
