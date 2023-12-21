import { Grid, Typography } from "@mui/material";

export default function Home() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h1">Welcome Back</Typography>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}></Grid>
        </Grid>
    );
}
