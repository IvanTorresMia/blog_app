import { Grid } from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            navigate("/sign-in");
        }
    }, []);

    return <>home here</>;
}

export default App;
