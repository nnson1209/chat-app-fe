import { alpha, createTheme } from "@mui/material/styles";

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
    typography: {
        fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Apple Color Emoji, Segoe UI Emoji",
        h4: {
            fontWeight: 800,
            letterSpacing: "-0.02em",
        },
        h5: {
            fontWeight: 800,
            letterSpacing: "-0.02em",
        },
        body1: {
            lineHeight: 1.55,
        },
        body2: {
            lineHeight: 1.55,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    minHeight: "100dvh",
                },
                "@keyframes mui-auto-fill": {
                    from: { display: "block" },
                    to: { display: "block" },
                },
                "@keyframes mui-auto-fill-cancel": {
                    from: { display: "block" },
                    to: { display: "block" },
                },
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    textTransform: "none",
                    fontWeight: 700,
                    borderRadius: 12,
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: 12,
                    backgroundColor: alpha(theme.palette.common.white, 0.06),
                    transition: theme.transitions.create(["border-color", "box-shadow", "background-color"], {
                        duration: theme.transitions.duration.shortest,
                    }),
                    "&:hover": {
                        backgroundColor: alpha(theme.palette.common.white, 0.08),
                    },
                    "&.Mui-focused": {
                        backgroundColor: alpha(theme.palette.common.white, 0.09),
                        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.25)}`,
                    },

                    /* When the browser autofills, keep the whole field (including adornments) visually consistent */
                    "&:has(input:-webkit-autofill)": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    },
                    "&:has(input:-webkit-autofill):hover": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.11),
                    },
                    "&:has(input:-webkit-autofill).Mui-focused": {
                        backgroundColor: alpha(theme.palette.primary.main, 0.12),
                    },

                    /* Fallback (no :has support): keep filled fields subtle and consistent */
                    "& input:-webkit-autofill": {
                        WebkitTextFillColor: theme.palette.text.primary,
                    },
                }),
                input: ({ theme }) => ({
                    paddingLeft: 16,
                    paddingRight: 16,
                    "&:-webkit-autofill": {
                        animationName: "mui-auto-fill",
                        animationDuration: "0.01s",
                        animationFillMode: "both",
                        WebkitTextFillColor: theme.palette.text.primary,
                        caretColor: theme.palette.text.primary,
                        WebkitBoxShadow: `0 0 0 1000px ${alpha(
                            theme.palette.primary.main,
                            0.1,
                        )} inset !important`,
                        borderRadius: 12,
                        transition: "background-color 9999s ease-out 0s",
                    },
                    "&:not(:-webkit-autofill)": {
                        animationName: "mui-auto-fill-cancel",
                        animationDuration: "0.01s",
                        animationFillMode: "both",
                    },
                    "&:-webkit-autofill:hover": {
                        WebkitBoxShadow: `0 0 0 1000px ${alpha(
                            theme.palette.primary.main,
                            0.11,
                        )} inset !important`,
                    },
                    "&:-webkit-autofill:focus": {
                        WebkitBoxShadow: `0 0 0 1000px ${alpha(
                            theme.palette.primary.main,
                            0.12,
                        )} inset !important`,
                    },
                }),
                notchedOutline: ({ theme }) => ({
                    borderColor: alpha(theme.palette.common.white, 0.12),
                }),
            },
        },
        MuiTextField: {
            defaultProps: {
                size: "medium",
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.text.secondary,
                }),
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: ({ theme }) => ({
                    borderRadius: 16,
                    border: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
                }),
            },
        },
        MuiMenu: {
            styleOverrides: {
                paper: ({ theme }) => ({
                    borderRadius: 14,
                    border: `1px solid ${alpha(theme.palette.common.white, 0.08)}`,
                }),
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                },
            },
        },
    },
});