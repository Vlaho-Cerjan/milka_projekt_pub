import { Box } from "@mui/material";
import { ReactNode, useContext } from "react";
import { CustomThemeContext } from '../../store/customThemeContext';
import useWindowSize from '../../utility/windowSize';
import DesktopLayout from "./desktop/desktopLayout";
import MobileLayout from "./mobile/mobileLayout";
import React from "react";

interface Props {
    children: ReactNode
}

const Layout = ({ children }: Props) => {
    const windowSize = useWindowSize();

    const [data, setData] = React.useState(null)

    React.useEffect(() => {
        fetch('/api/layout-data')
        .then((res) => res.json())
        .then((data) => {
            setData(data)
        })
    }, []);

    return (
        windowSize.width > 600
            ? (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 0,
                    }}
                >
                    <DesktopLayout data={data}>
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
                    }}
                >
                    <MobileLayout data={data}>
                        {children}
                    </MobileLayout>
                </Box>
            )
    )
}

export default Layout;