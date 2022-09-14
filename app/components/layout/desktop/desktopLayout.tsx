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
import { CustomThemeContext } from "../../../store/customThemeContext";
import Footer from '../footer/footer';

interface DesktopLayoutProps {
    children: React.ReactNode,
    data: any
}

const TopItem = styled(Box)(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}))

const StyledLink = styled(Link)(({ theme }) => ({
        padding: "2% 3%",
        marginRight: "2px",
        fontWeight: 600,
        fontSize: "1.2rem",
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

const DesktopLayout = ({children, data}: DesktopLayoutProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { isDark, setTheme } = React.useContext(CustomThemeContext);
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
        <Box>
            <Paper
                elevation={10}
                square
                sx={{
                    padding: "16px",
                }}
                ref={topBarRef}
            >

                {typeof data !== "undefined" && data ?
                    <Grid
                        sx={{
                            mt: [0, 0, 0, "-16px"],
                            borderRadius: 0,
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: 500,
                        }}
                        container
                        spacing={2}
                    >
                        <Grid item xs={6} lg={3}>
                            <TopItem>
                                <Link target="_blank" href={data.company_info.address_url} sx={{ display: "flex" }}>
                                    <LocationCityIcon sx={{ mr: "8px" }}/>
                                    { data.company_info.address_short }
                                </Link>
                            </TopItem>
                        </Grid>
                        <Grid item xs={6} lg={4}>
                            <TopItem>
                                <Link href={"mailto:"+data.company_info.email} sx={{ display: "flex" }}>
                                    <EmailIcon sx={{ mr: "8px" }}/>
                                    { data.company_info.email }
                                </Link>
                            </TopItem>
                        </Grid>
                        <Grid item xs={6} lg={4}>
                            <TopItem>
                                <Link href={"tel:"+(data.company_info.phone).replace(/[\(\)0 ]/g, '')} sx={{ display: "flex" }}>
                                    <LocalPhoneIcon sx={{ mr: "8px" }}/>
                                    { data.company_info.phone }
                                </Link>
                            </TopItem>
                        </Grid>
                        <Grid item xs={6} lg={1}>
                            <TopItem>
                                <Box sx={{ pl: 0, lineHeight: 0, display: "flex" }}>
                                    <Link sx={{ lineHeight: 0 }} target="_blank" href={data.socials.find((social: any) => social.type === "instagram").link}>
                                        <InstagramIcon sx={{ mr: "4px", fontSize: "30px", color: isDark?"#f50f56":"#E4405F" }} />
                                    </Link>
                                    <Link sx={{ lineHeight: 0 }} target="_blank" href={data.socials.find((social: any) => social.type === "facebook").link}>
                                        <FacebookIcon sx={{ fontSize: "30px", color: isDark?"#2374E1":"#1877F2" }}/>
                                    </Link>
                                </Box>
                                <MaterialUISwitch onClick={() => setTheme()} sx={{ m: 1 }} checked={isDark} />
                            </TopItem>
                        </Grid>
                    </Grid>
                :
                    null
                }
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
                                        quality={90}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={9} md={10}>
                                <Box
                                textAlign="center"
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                >
                                    <StyledLink href="/">Naslovnica</StyledLink>
                                    {
                                        //<StyledLink href="/novosti">Novosti</StyledLink>
                                    }
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
                                            fontSize: "1.2rem",
                                            fontWeight: "600",
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
            {router.pathname !== "/" ?
            <Paper
                square
            >
                <NextBreadcrumbs
                    omitRootLabel={router.pathname === "/"}
                    replaceCharacterList={[{ from: '.', to: ' ' }]}
                    transformLabel={(title: string) => {
                        return title.charAt(0).toUpperCase()+title.slice(1).replace(/\-[a-z]/g, match => match.toUpperCase())
                    }}
                />
            </Paper>
            :
                null
            }
            <Paper
                elevation={2}
                square
                sx={{
                    minHeight: 'calc(100vh - '+(Math.ceil((typeof headerRef.current?.scrollHeight !== "undefined"?headerRef.current.scrollHeight:0))+Math.ceil((typeof topBarRef.current?.scrollHeight !== "undefined"?topBarRef.current.scrollHeight:0))+1)+'px)'
                }}
            >
                {children}
            </Paper>
            <Footer data={data} />
        </Box>
    )
}

export default DesktopLayout