import "./App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            navigate("/sign-in");
        }
    }, [navigate]);

    return <Home />;
}

export default App;
