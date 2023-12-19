import { Grid, Typography } from "@mui/material";
import { theme } from "../../theme";

export default function Home() {
    return (
        <Grid
            container
            paddingTop={theme.spacing(6)}
            paddingLeft={theme.spacing(15)}
            paddingRight={theme.spacing(15)}
        >
            <Grid item xs={12}>
                <Typography variant="h1">Welcome Back</Typography>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
        </Grid>
    );
}
