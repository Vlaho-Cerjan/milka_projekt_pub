import { Container, styled } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
    padding: "64px 0 16px",

    [theme.breakpoints.down('lg')]: {
        padding: "48px 0 16px",
    },

    [theme.breakpoints.down('md')]: {
        padding: "32px 0 12px",
    },

    [theme.breakpoints.down('sm')]: {
        padding: "16px 0 8px",
    }
}))