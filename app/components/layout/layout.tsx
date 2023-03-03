import { Backdrop, Box, CircularProgress } from "@mui/material";
import { ReactNode } from "react";
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
    const [data, setData] = React.useState(null);
    React.useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}layout_data`)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
            }
            )
            .catch((err) => {
                console.log(err);
            }
            );
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

                    <Backdrop open={typeof data === "undefined" || data === null} sx={{ zIndex: 1000000 }} >
                        <CircularProgress color="primary" />
                    </Backdrop>
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

                    <Backdrop open={typeof data === "undefined" || data === null} sx={{ zIndex: 1000000 }} >
                        <CircularProgress color="primary" />
                    </Backdrop>
                </Box>
            )
    )
}

export default Layout;