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
    padding: "1.5% 2%",
    marginRight: "16px",
    fontWeight: 600,
    fontSize: "1.2rem",
    '&:hover': { backgroundColor: theme.palette.action.hover, borderRadius: "5px" },
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

const DesktopLayout = ({ children, data }: DesktopLayoutProps) => {
    const [anchorItemEl, setAnchorItemEl] = React.useState<any | null>(null);
    const handleItemClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorItemEl((prevState: any) => ({
            ...prevState,
            [event.currentTarget.id]: event.currentTarget
        }));
    }

    const handleItemClose = () => {
        setAnchorItemEl(null);
    }
    const { isDark, setTheme } = React.useContext(CustomThemeContext);

    const router = useRouter();

    const imageSrc = isDark ? "/images/logo/logo_transparent_dark.png" : "/images/logo/logo_transparent.png";

    const topBarRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const breadcrumbsRef = useRef<HTMLDivElement>(null);

    const [minContentHeight, setMinContentHeight] = useState<number>(0);

    const [threshold, setThreshold] = useState(0);

    useEffect(() => {
        if (topBarRef && headerRef && topBarRef.current && headerRef.current) setThreshold(topBarRef.current.clientHeight + headerRef.current.clientHeight);
    }, [topBarRef.current?.clientHeight, headerRef.current?.clientHeight])

    useEffect(() => {
        if (topBarRef && headerRef && footerRef && breadcrumbsRef && topBarRef.current && headerRef.current && footerRef.current && breadcrumbsRef.current) setMinContentHeight(topBarRef.current.clientHeight + headerRef.current.clientHeight + footerRef.current.clientHeight + breadcrumbsRef.current.clientHeight);
    }, [topBarRef.current?.clientHeight, headerRef.current?.clientHeight, footerRef.current?.clientHeight, breadcrumbsRef.current?.clientHeight])

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
                                    <LocationCityIcon sx={{ mr: "8px" }} />
                                    {data.company_info.address_short}
                                </Link>
                            </TopItem>
                        </Grid>
                        <Grid item xs={6} lg={4}>
                            <TopItem>
                                <Link href={"mailto:" + data.company_info.email} sx={{ display: "flex" }}>
                                    <EmailIcon sx={{ mr: "8px" }} />
                                    {data.company_info.email}
                                </Link>
                            </TopItem>
                        </Grid>
                        <Grid item xs={6} lg={4}>
                            <TopItem>
                                <Link href={"tel:" + (data.company_info.phone).replace(/[\(\)0 ]/g, '')} sx={{ display: "flex" }}>
                                    <LocalPhoneIcon sx={{ mr: "8px" }} />
                                    {data.company_info.phone}
                                </Link>
                            </TopItem>
                        </Grid>
                        <Grid item xs={6} lg={1}>
                            <TopItem>
                                <Box sx={{ pl: 0, lineHeight: 0, display: "flex" }}>
                                    <Link sx={{ lineHeight: 0 }} target="_blank" href={data.socials.find((social: any) => social.type === "instagram").href}>
                                        <InstagramIcon sx={{ mr: "4px", fontSize: "30px", color: isDark ? "#f50f56" : "#E4405F" }} />
                                    </Link>
                                    <Link sx={{ lineHeight: 0 }} target="_blank" href={data.socials.find((social: any) => social.type === "facebook").href}>
                                        <FacebookIcon sx={{ fontSize: "30px", color: isDark ? "#2374E1" : "#1877F2" }} />
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
                                {typeof data !== "undefined" && data && data.navigation ?
                                    <Box
                                        textAlign="center"
                                        component={"nav"}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {data.navigation.filter((item: any) => item.parent_id === null).map((navItem: any) => (
                                            navItem.type === "link" ?
                                                <StyledLink href={typeof navItem.href !== "undefined" && navItem.href ? navItem.href : "#"} key={"navLink_+" + navItem.id}>
                                                    {navItem.name}
                                                </StyledLink>

                                                : navItem.type === "button" ?
                                                    <Button
                                                        key={"navButton_" + navItem.id}
                                                        id={"navItem_" + navItem.id}
                                                        aria-controls={(anchorItemEl && anchorItemEl["navItem_" + navItem.id]) ? 'basic-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={(anchorItemEl && anchorItemEl["navItem_" + navItem.id]) ? 'true' : undefined}
                                                        onClick={handleItemClick}
                                                        sx={{
                                                            textTransform: "none",
                                                            textDecoration: "underline",
                                                            textDecorationColor: "rgba(144, 202, 249, 0.4)",
                                                            fontSize: "1.2rem",
                                                            fontWeight: "600",
                                                            lineHeight: "1.5",
                                                            padding: "1.5% 2%",
                                                            marginRight: "2px",
                                                            letterSpacing: "0.00938em",
                                                            borderRadius: 0,
                                                            '&:hover': { backgroundColor: "action.hover", textDecoration: "underline", textDecorationColor: "inherit", borderRadius: "5px" },
                                                        }}
                                                        endIcon={<KeyboardArrowDownIcon sx={{ fontSize: "18px !important", }} />}
                                                    >
                                                        {navItem.name}
                                                    </Button>
                                                    :
                                                    null
                                        ))}
                                        {
                                            data.navigation.filter((navItem: any) => navItem.type === "button").map((navItem: any) => (
                                                <Menu
                                                    key={"navMenu_" + navItem.id}
                                                    id={"navMenu_" + navItem.id}
                                                    anchorEl={(anchorItemEl) ? anchorItemEl["navItem_" + navItem.id] : null}
                                                    open={(anchorItemEl && anchorItemEl["navItem_" + navItem.id]) ? true : false}
                                                    onClose={handleItemClose}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'navItem_' + navItem.id,
                                                    }}
                                                >
                                                    {data.navigation.filter((itemChild: any) => itemChild.parent_id === navItem.id).map((navItemChild: any) => (
                                                        navItemChild.type === "link" ?
                                                            <MenuItem key={navItemChild.id} sx={{ p: 0, '&:not(:last-of-type)': { mb: "4px" } }} onClick={handleItemClose}>
                                                                <StyledLink sx={{ p: "16px 32px", width: "100%", '&:hover': { backgroundColor: 'transparent', } }} href={typeof navItemChild.href !== "undefined" && navItemChild.href ? navItemChild.href : "#"}>{navItemChild.name}</StyledLink>
                                                            </MenuItem>
                                                            : navItemChild.type === "button" ?
                                                                <MenuItem key={navItemChild.id} sx={{ p: 0,  '&:not(:last-of-type)': { mb: "4px" } }} onClick={handleItemClose}>
                                                                    <Button
                                                                        id={"navItem_" + navItemChild.id}
                                                                        aria-controls={(anchorItemEl && anchorItemEl["navItem_" + navItemChild.id]) ? 'basic-menu' : undefined}
                                                                        aria-haspopup="true"
                                                                        aria-expanded={(anchorItemEl && anchorItemEl["navItem_" + navItemChild.id]) ? 'true' : undefined}
                                                                        onClick={handleItemClick}
                                                                        sx={{
                                                                            textTransform: "none",
                                                                            textDecoration: "underline",
                                                                            textDecorationColor: "rgba(144, 202, 249, 0.4)",
                                                                            fontSize: "1.2rem",
                                                                            fontWeight: "600",
                                                                            lineHeight: "1.5",
                                                                            padding: "2% 3%",
                                                                            marginRight: "2px",
                                                                            letterSpacing: "0.00938em",
                                                                            borderRadius: 0,
                                                                            '&:hover': { backgroundColor: "action.hover", textDecoration: "underline", textDecorationColor: "inherit", }
                                                                        }}
                                                                        endIcon={<KeyboardArrowDownIcon sx={{ fontSize: "18px !important", }} />}
                                                                    >
                                                                        {navItem.name}
                                                                    </Button>
                                                                </MenuItem>
                                                                :
                                                                null
                                                    ))}
                                                </Menu>
                                            ))
                                        }
                                    </Box>
                                    :
                                    null
                                }
                            </Grid>
                        </Grid>
                    </Paper>
                </AppBar>
            </HideOnScroll>
            {router.pathname !== "/" ?
                <Paper
                    square
                    ref={breadcrumbsRef}
                >
                    <NextBreadcrumbs
                        omitRootLabel={router.pathname === "/"}
                        replaceCharacterList={[{ from: '.', to: ' ' }]}
                        transformLabel={(title: string) => {
                            return title.charAt(0).toUpperCase() + title.slice(1).replace(/\-[a-z]/g, match => match.replace("-", " ").toUpperCase())
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
                    minHeight: 'calc(100vh - ' + (minContentHeight + 1) + 'px)',
                }}
            >
                {children}
            </Paper>
            <Box ref={footerRef}>
                <Footer data={data} />
            </Box>
        </Box>
    )
}

export default DesktopLayout