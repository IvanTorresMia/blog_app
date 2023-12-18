import { createTheme } from "@mui/material";
import { blackColor, grayColor, greenColor, whiteColor } from "./const/colors";
import { lightGreen } from "./const/colors";
import { linearProgressClasses } from "@mui/material/LinearProgress";

const barlowFont = "'Barlow', sans-serif";

export const theme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                variant: "standard",
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    width: 40,
                    height: "100%",
                    [`&.${linearProgressClasses.colorPrimary}`]: {
                        backgroundColor: whiteColor,
                    },
                    [`& .${linearProgressClasses.bar}`]: {
                        borderRadius: `10px 10px 0px 0px`,
                    },
                },
            },
        },
        MuiIcon: {
            defaultProps: {
                fontSize: "medium",
            },
            styleOverrides: {
                root: {
                    marginTop: "-2px",
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    padding: 0,
                    borderRight: `0.9px solid ${blackColor}`,
                },
            },
        },
    },
    palette: {
        primary: {
            main: greenColor,
            light: lightGreen,
        },
        secondary: {
            main: blackColor,
        },
        info: {
            main: grayColor,
        },
        success: { main: lightGreen },
    },
    typography: {
        fontFamily: barlowFont,
        // big titles
        h1: {
            fontWeight: 600,
            fontSize: "36px",
            lineHeight: "32px",
            "@media (max-width:1500px)": {
                fontSize: "34px",
            },
        },
        h2: {
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "44px",
            "@media (max-width:1500px)": {
                fontSize: "22px",
            },
        },
        h3: {
            fontWeight: 500,
            fontSize: "20px",
            "@media (max-width:1500px)": {
                fontSize: "18px",
            },
        },
        h4: {
            fontWeight: 400,
            fontSize: "16px",
            "@media (max-width:1500px)": {
                fontSize: "14px",
            },
        },
        // Medium Titles
        subtitle1: {
            fontWeight: 400,
            fontSize: "22px",
            lineHeight: "28px",
            "@media (max-width:1500px)": {
                fontSize: "16px",
            },
        },
        // Small Titles
        subtitle2: {
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            "@media (max-width:1500px)": {
                fontSize: "14px",
            },
        },
        // Big body for tables etc.
        body1: {
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "24px",
            "@media (max-width:1500px)": {
                fontSize: "12px",
            },
        },
        // small body for table data etc.
        body2: {
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20.02px",
            "@media (max-width:1500px)": {
                fontSize: "12px",
            },
        },
        caption: {
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "20.02px",
        },
    },
    shape: {
        borderRadius: 8,
    },
    breakpoints: {
        values: {
            xl: 1500,
            lg: 1300,
            md: 1000,
            sm: 600,
            xs: 0,
        },
    },
});
