import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { User } from "../../types/auth-types";
import { getCurrentUser } from "../../apis/auth";
import RenderBlogs from "./components/RenderBlogs";

export default function Blogs() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    const getUser = async () => {
        try {
            const res = await getCurrentUser();
            const userData: User = res.data;
            setUser(userData);
        } catch (e) {
            redirect("/sign-in");
            console.log(e);
        }
    };

    useEffect(() => {
        getUser();
    }, []);
    return (
        <Box>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h1">Blog Center</Typography>
                </Grid>
                <Grid item xs={6} display={"flex"} justifyContent={"flex-end"}>
                    <Button
                        onClick={() => {
                            navigate("/create-blog");
                        }}
                        variant="contained"
                    >
                        Create New Blog
                    </Button>
                </Grid>
            </Grid>
            {!!user && <RenderBlogs user={user} />}
        </Box>
    );
}
