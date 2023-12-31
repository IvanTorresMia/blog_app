import { Box, Divider, Grid, Typography } from "@mui/material";
import RenderTasksHome from "./components/RenderTasksHome";
import { theme } from "../../theme";
import { blackColor, greenColor, whiteColor } from "../../const/colors";
import RenderBlogsHome from "./components/RenderBlogsHome";
import { useAuth } from "../../providers/useAuth";

export default function Home() {
    const userData = useAuth();

    return (
        <Grid container>
            <Grid item xs={12} marginBottom={theme.spacing(2)}>
                <Typography variant="h1">Welcome Back</Typography>
            </Grid>
            <Grid
                item
                xs={5.8}
                border={`${theme.spacing(0.1)} solid ${blackColor}`}
                marginTop={theme.spacing(2)}
                marginRight={theme.spacing(2)}
                borderRadius={1}
            >
                <Box bgcolor={greenColor} padding={theme.spacing(2)}>
                    <Typography color={whiteColor} variant="subtitle1">
                        Your Tasks
                    </Typography>
                </Box>

                <Divider />
                {!!userData.user && <RenderTasksHome user={userData.user} />}
            </Grid>
            <Grid
                item
                xs={5.8}
                border={`${theme.spacing(0.1)} solid ${blackColor}`}
                marginTop={theme.spacing(2)}
                borderRadius={1}
            >
                <Box bgcolor={greenColor} padding={theme.spacing(2)}>
                    <Typography color={whiteColor} variant="subtitle1">
                        Your Blogs
                    </Typography>
                </Box>
                <Divider />

                {!!userData.user && <RenderBlogsHome user={userData.user} />}
            </Grid>
        </Grid>
    );
}
