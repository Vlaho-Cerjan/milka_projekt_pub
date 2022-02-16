import { Box, Paper } from "@mui/material";
import React, { ReactNode, useContext, useRef, useEffect } from "react";
import { CustomThemeContext } from '../../store/customThemeContext';
import useWindowSize from '../../utility/windowSize';
import DesktopLayout from "./desktop/desktopLayout";
import MobileLayout from "./mobile/mobileLayout";

interface Props {
    children: ReactNode,
}

const Layout = ({children}: Props) => {
    const { currentTheme, setTheme } = useContext(CustomThemeContext);
    const windowSize = useWindowSize();
    const isDark = currentTheme === "dark";

    if(typeof window === "undefined") return <></>;

    return (
        windowSize.width > 600
        ?(
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 0,
                }}
            >
                <DesktopLayout isDark={isDark} setTheme={setTheme}>
                    {children}
                </DesktopLayout>
            </Box>
        )
        :
        (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 0,
                    fontSize: "0.8rem",
                }}
            >
                <MobileLayout isDark={isDark} setTheme={setTheme}>
                    {children}
                </MobileLayout>
            </Box>
        )
    )
}

export default Layout;