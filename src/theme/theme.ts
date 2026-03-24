import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#050a12",
            paper: "#0b1320",
        },
        primary: {
            main: "#007FFF",
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#b0b8c4",
        },
        error: {
            main: "#f44336",
        },
    },
    shape: {
        borderRadius: 12,
    },
});