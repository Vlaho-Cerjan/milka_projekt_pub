import { Box, Paper, Grid, styled, MenuItem, Menu, Button, AppBar, useScrollTrigger, Slide } from "@mui/material";
import { MaterialUISwitch } from "../modeSwitch";
import Image from 'next/image';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import NextBreadcrumbs from "../breadcrumbs/breadcrumbs";
import Link from "../../navigation/Link";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import ScrollProps from "../../../interfaces/ScrollProps";
import { useRouter } from "next/router";
import React, { useRef, useEffect, useState } from "react";

interface DesktopLayoutProps {
    children: React.ReactNode,
    isDark: boolean,
    setTheme: () => void,
}

const StyledLink = styled(Link)(({ theme }) => ({
        padding: "2% 3%",
        marginRight: "2px",
        '&:hover': { backgroundColor: theme.palette.action.hover }
    }))

const HideOnScroll = (props: ScrollProps) => {
    const { children, threshold } = props;
    let trigger = useScrollTrigger({
        threshold: threshold,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

const DesktopLayout = ({children, isDark, setTheme}: DesktopLayoutProps) => {
    const TopItem = styled(Box)(() => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }))

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const router = useRouter();

    const imageSrc = isDark ? "/images/logo/logo_transparent_dark.png" : "/images/logo/logo_transparent.png";

    const topBarRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    const [threshold, setThreshold] = useState(0);

    useEffect(() => {
        if(topBarRef && headerRef && topBarRef.current && headerRef.current) setThreshold(topBarRef.current.clientHeight+headerRef.current.clientHeight);
    }, [topBarRef.current?.clientHeight, headerRef.current?.clientHeight])

    return (
        <>
            <Paper
                elevation={10}
                square
                sx={{
                    padding: "16px",
                }}
                ref={topBarRef}
            >
                <Grid
                    sx={{
                        mt: [0, 0, 0, "-16px"],
                        borderRadius: 0,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    container
                    spacing={2}
                >
                    <Grid item xs={6} lg={3}>
                        <TopItem>
                            <Link target="_blank" href="https://goo.gl/maps/UPeifUhNfmjEVP7PA" sx={{ display: "flex" }}>
                                <LocationCityIcon sx={{ mr: "8px" }}/>
                                Crna Rika 7a, 20340 Ploče
                            </Link>
                        </TopItem>
                    </Grid>
                    <Grid item xs={6} lg={4}>
                        <TopItem>
                            <Link  target="_blank" href="mailto:recepcija@varela.hr" sx={{ display: "flex" }}>
                                <EmailIcon sx={{ mr: "8px" }}/>
                                recepcija@varela.hr
                            </Link>
                        </TopItem>
                    </Grid>
                    <Grid item xs={6} lg={4}>
                        <TopItem>
                            <Link  target="_blank" href="tel:+385916138766" sx={{ display: "flex" }}>
                                <LocalPhoneIcon sx={{ mr: "8px" }}/>
                                +385 (9)1 613 8766
                            </Link>
                        </TopItem>
                    </Grid>
                    <Grid item xs={6} lg={1}>
                        <TopItem>
                            <Box sx={{ pl: 0, lineHeight: 0, display: "flex" }}>
                                <Link sx={{ lineHeight: 0 }} target="_blank" href="https://www.instagram.com/ambulanta_varela/">
                                    <InstagramIcon sx={{ mr: "4px", fontSize: "30px", color: isDark?"#f50f56":"#E4405F" }} />
                                </Link>
                                <Link sx={{ lineHeight: 0 }} target="_blank" href="https://www.facebook.com/ambulanta.varela">
                                    <FacebookIcon sx={{ fontSize: "30px", color: isDark?"#2374E1":"#1877F2" }}/>
                                </Link>
                            </Box>
                            <MaterialUISwitch onClick={setTheme} sx={{ m: 1 }} checked={isDark} />
                        </TopItem>
                    </Grid>
                </Grid>
            </Paper>
            <HideOnScroll threshold={threshold}>
                <AppBar ref={headerRef} position="sticky">
                    <Paper
                        elevation={2}
                        square
                    >
                        <Grid
                            sx={
                                {
                                    pt: "8px",
                                    pb: "8px",
                                    borderRadius: 0,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    minHeight: "103px",
                                }
                            }
                            container
                            spacing={2}
                        >
                            <Grid item xs={3} md={2}>
                                <Box textAlign="left">
                                    <Image
                                        src={imageSrc}
                                        alt="logo image of Varela Clinic"
                                        width={138}
                                        height={93}
                                        layout="fixed"
                                        quality={100}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={9} md={10}>
                                <Box textAlign="center">
                                    <StyledLink href="/">Naslovnica</StyledLink>
                                    <StyledLink href="/novosti">Novosti</StyledLink>
                                    <Button
                                        id="usluge-i-cjenik"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}
                                        sx={{
                                            textTransform: "none",
                                            textDecoration: "underline",
                                            textDecorationColor: "rgba(144, 202, 249, 0.4)",
                                            fontSize: "1rem",
                                            fontWeight: "400",
                                            lineHeight: "1.2",
                                            padding: "2% 3%",
                                            marginRight: "2px",
                                            letterSpacing: "0.00938em",
                                            borderRadius: 0,
                                            '&:hover': { backgroundColor: "action.hover", textDecoration: "underline", textDecorationColor: "inherit", }
                                        }}
                                        endIcon={<KeyboardArrowDownIcon sx={{ fontSize: "18px !important", }} />}
                                    >
                                        Usluge i Cjenik
                                    </Button>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                        'aria-labelledby': 'usluge-i-cjenik',
                                        }}
                                    >
                                        <MenuItem sx={{ p: "16px 32px" }} onClick={handleClose}>
                                            <StyledLink sx={{ '&:hover': {backgroundColor: 'transparent',} }} href="/dermatologija">Dermatologija</StyledLink>
                                        </MenuItem>
                                        <MenuItem sx={{ p: "16px 32px" }} onClick={handleClose}>
                                            <StyledLink sx={{ '&:hover': {backgroundColor: 'transparent',} }} href="/kozmetologija">Kozmetologija</StyledLink>
                                        </MenuItem>
                                        <MenuItem sx={{ p: "16px 32px" }} onClick={handleClose}>
                                            <StyledLink sx={{ '&:hover': {backgroundColor: 'transparent',} }} href="/kirurgija">Kirurgija</StyledLink>
                                        </MenuItem>
                                        <MenuItem sx={{ p: "16px 32px" }} onClick={handleClose}>
                                            <StyledLink sx={{ '&:hover': {backgroundColor: 'transparent',} }} href="/gostojuci-doktori">Gostujući doktori</StyledLink>
                                        </MenuItem>
                                    </Menu>
                                    <StyledLink href="/faq">FAQ</StyledLink>
                                    <StyledLink href="/kontakt">Kontakt</StyledLink>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </AppBar>
            </HideOnScroll>
            <Paper
                square
            >
                <NextBreadcrumbs
                    omitRootLabel={router.pathname === "/"}
                    replaceCharacterList={[{ from: '.', to: ' ' }]}
                />
            </Paper>
            <Paper
                elevation={2}
                square
                sx={{
                    minHeight: 'calc(100vh - '+(Math.ceil((typeof headerRef.current?.scrollHeight !== "undefined"?headerRef.current.scrollHeight:0))+Math.ceil((typeof topBarRef.current?.scrollHeight !== "undefined"?topBarRef.current.scrollHeight:0))+1)+'px)'
                }}
            >
                {children}
            </Paper>
        </>
    )
}

export default DesktopLayout