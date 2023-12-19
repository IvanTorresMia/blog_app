import { Box } from "@mui/material";
import AppContainer from "./AppContainer";
import { Outlet, useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import { useEffect } from "react";

export default function Layout() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            navigate("/sign-in");
        }
    }, []);

    return (
        <AppContainer>
            <Navigation>
                <Box>
                    <Outlet />
                </Box>
            </Navigation>
        </AppContainer>
    );
}
