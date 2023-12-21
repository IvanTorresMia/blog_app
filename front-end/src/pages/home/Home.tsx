import { Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { User } from "../../types/auth-types";
import { getCurrentUser } from "../../apis/auth";
import RenderTasksHome from "./components/RenderTasksHome";
import { theme } from "../../theme";
import { blackColor } from "../../const/colors";

export default function Home() {
    const [user, setUser] = useState<User | null>(null);

    const getUser = async () => {
        try {
            const res = await getCurrentUser();
            const userData: User = res.data;
            setUser(userData);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h1">Welcome Back</Typography>
            </Grid>
            <Grid
                item
                xs={6}
                border={`${theme.spacing(0.1)} solid ${blackColor}`}
                padding={theme.spacing(2)}
                marginTop={theme.spacing(2)}
                borderRadius={1}
            >
                <Typography variant="subtitle1">Your tasks</Typography>
                <Divider />
                {!!user && <RenderTasksHome user={user} />}
            </Grid>
            <Grid item xs={6}></Grid>
        </Grid>
    );
}
