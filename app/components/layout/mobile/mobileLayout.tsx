import { Box, Paper, Grid, styled, SwipeableDrawer, Button, Container, Menu, MenuItem, useScrollTrigger, Slide, AppBar } from '@mui/material';
import { MaterialUISwitch } from "../modeSwitch";
import Image from 'next/image';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import React, { useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from "../../navigation/Link";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NextBreadcrumbs from "../breadcrumbs/breadcrumbs";
import { useRouter } from 'next/router';
import ScrollProps from "../../../interfaces/ScrollProps";

interface MobileLayoutProps {
    children: React.ReactNode,
    isDark: boolean,
    setTheme: () => void,
}

const MobileLayout = ({children, isDark, setTheme}: MobileLayoutProps) => {
    const [state, setState] = React.useState({
        drawer: false
    });

    const HideOnScroll = (props: ScrollProps) => {
        const { children } = props;
        let trigger = useScrollTrigger();
        return (
            <Slide appear={false} direction="down" in={!trigger}>
                {children}
            </Slide>
        );
    }

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown'){
            if((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift') return;
        }

        setState({ ...state, drawer: open });
    };

    const router = useRouter();

    const TopItem = styled(Box)(() => ({
        display: "flex",
        justifyContent: "start",
        alignItems: "start"
    }))
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const imageSrc = isDark ? "/images/logo/logo_transparent_dark.png" : "/images/logo/logo_transparent.png";

    const headerRef=  useRef<HTMLDivElement>(null);

    return (
        <>
            <HideOnScroll>
                <AppBar ref={headerRef} position="sticky">
                    <Paper
                        variant="outlined"
                        square
                    >
                        <Grid
                            container
                            spacing={2}
                            sx={{
                                alignItems: "center",
                            }}
                        >
                            <Grid item xs={4} md={2}>
                                <Button
                                    onClick={toggleDrawer(true)}
                                >
                                    <MenuIcon fontSize="large" />
                                </Button>
                            </Grid>
                            <Grid item xs={4} md={8} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <Link sx={{ lineHeight: 0 }} target="_blank" href="https://www.instagram.com/ambulanta_varela/">
                                    <InstagramIcon sx={{ mr: "4px", fontSize: "30px", color: isDark?"#f50f56":"#E4405F" }} />
                                </Link>
                                <Link sx={{ lineHeight: 0 }} target="_blank" href="https://www.facebook.com/ambulanta.varela">
                                    <FacebookIcon sx={{ fontSize: "30px", color: isDark?"#2374E1":"#1877F2" }}/>
                                </Link>
                            </Grid>
                            <Grid item xs={4} md={2} sx={{ textAlign: "end" }}>
                                <MaterialUISwitch onClick={setTheme} sx={{ m: 1 }} checked={isDark} />
                            </Grid>
                        </Grid>
                    </Paper>
                </AppBar>
            </HideOnScroll>
            <Paper
                elevation={2}
                square
                sx={{ '& .MuiBreadcrumbs-ol': { justifyContent: "center" } }}
            >
                <NextBreadcrumbs
                    omitRootLabel={router.pathname === "/"}
                    replaceCharacterList={[{ from: '.', to: ' ' }]}
                />
            </Paper>
            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                anchor={"left"}
                open={state.drawer}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                PaperProps={{
                    sx: {
                        width: "100vw"
                    }
                }}
            >
                <Paper
                    square
                    variant="outlined"
                    sx={{
                        padding: "8px",
                    }}
                >
                    <Grid
                        sx={{
                            mt: [0, 0, 0, "-16px"],
                            borderRadius: 0,
                            justifyContent: "start",
                            alignItems: "start",
                            flexWrap: "nowrap",
                            flexDirection: "column",
                            position: "relative",
                        }}
                        container
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <TopItem>
                                <Link target="_blank" href="https://goo.gl/maps/UPeifUhNfmjEVP7PA" sx={{ display: "flex" }}>
                                    <LocationCityIcon sx={{ mr: "8px" }}/>
                                    Crna Rika 7a, 20340 Ploče
                                </Link>
                            </TopItem>
                        </Grid>
                        <Grid item xs={12}>
                            <TopItem>
                                <Link target="_blank" href="mailto:recepcija@varela.hr" sx={{ display: "flex" }}>
                                    <EmailIcon sx={{ mr: "8px" }}/>
                                    recepcija@varela.hr
                                </Link>
                            </TopItem>
                        </Grid>
                        <Grid item xs={12}>
                            <TopItem>
                                <Link  target="_blank" href="tel:+385916138766" sx={{ display: "flex" }}>
                                    <LocalPhoneIcon sx={{ mr: "8px" }}/>
                                    +385 (9)1 613 8766
                                </Link>
                            </TopItem>
                        </Grid>
                        <Grid item xs={12} >
                            <TopItem sx={{
                                width: "100vw",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}>
                                <Container sx={{ pl: 0, lineHeight: 0 }}>
                                    <Link sx={{ lineHeight: 0 }} target="_blank" href="https://www.instagram.com/ambulanta_varela/">
                                        <InstagramIcon sx={{ mr: "4px", fontSize: "30px", color: isDark?"#f50f56":"#E4405F" }} />
                                    </Link>
                                    <Link sx={{ lineHeight: 0 }} target="_blank" href="https://www.facebook.com/ambulanta.varela">
                                        <FacebookIcon sx={{ fontSize: "30px", color: isDark?"#2374E1":"#1877F2" }}/>
                                    </Link>
                                </Container>
                                <MaterialUISwitch onClick={setTheme} sx={{ m: "0 1rem 0 1rem" }} checked={isDark} />
                            </TopItem>
                        </Grid>
                        <Grid
                            item
                            sx={
                                {
                                    position: "absolute",
                                    top: "8px",
                                    right: "0",
                                    padding: "0 !important",
                                }
                            }
                            xs={12}
                        >
                            <Button
                                sx={{ p: 0 }}
                                onClick={toggleDrawer(false)}
                            >
                                <CloseIcon fontSize="large" />
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper
                    elevation={2}
                    sx={{ height: "100%" }}
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
                                flexDirection: "column-reverse",
                            }
                        }
                        container
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <Box textAlign="left">
                                <Image
                                    src={imageSrc}
                                    alt="logo image of Varela Clinic"
                                    width={138}
                                    height={93}
                                    quality={"100"}
                                    //objectFit="cover"
                                >

                                </Image>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sx={{ width: "100%" }}>
                            <Box textAlign="center" sx={{ display: "flex", flexDirection: "column", fontSize: "1.5rem", width: "100%"  }}>
                                <Link onClick={toggleDrawer(false)} sx={{ p: "8px 0" }} href="/">Naslovnica</Link>
                                <Link onClick={toggleDrawer(false)} sx={{ p: "8px 0" }} href="/novosti">Novosti</Link>
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
                                        fontSize: "1.5rem",
                                        fontWeight: "400",
                                        lineHeight: "1.2",
                                        marginRight: "2px",
                                        letterSpacing: "0.00938em",
                                        borderRadius: 0,
                                        p: "8px 0" }}
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
                                    PaperProps={{
                                        sx: { minWidth: "100%", left: "0 !important" }
                                    }}
                                >
                                    <MenuItem sx={{ fontSize: "1.5rem", justifyContent: "center" }} onClick={handleClose}>
                                        <Link  sx={{ display: "block", '&:hover': {backgroundColor: 'transparent',} }} href="/dermatologija">Dermatologija</Link>
                                    </MenuItem>
                                    <MenuItem sx={{ fontSize: "1.5rem", justifyContent: "center" }} onClick={handleClose}>
                                        <Link sx={{ display: "block", '&:hover': {backgroundColor: 'transparent',} }} href="/kozmetologija">Kozmetologija</Link>
                                    </MenuItem>
                                    <MenuItem sx={{ fontSize: "1.5rem", justifyContent: "center" }} onClick={handleClose}>
                                        <Link sx={{ display: "block", '&:hover': {backgroundColor: 'transparent',} }} href="/kirurgija">Kirurgija</Link>
                                    </MenuItem>
                                    <MenuItem sx={{ fontSize: "1.5rem", justifyContent: "center" }} onClick={handleClose}>
                                        <Link sx={{ display: "block", '&:hover': {backgroundColor: 'transparent',} }} href="/gostojuci-doktori">Gostujući doktori</Link>
                                    </MenuItem>
                                </Menu>
                                <Link onClick={toggleDrawer(false)} sx={{ p: "8px 0" }} href="/faq">FAQ</Link>
                                <Link onClick={toggleDrawer(false)} sx={{ p: "8px 0" }} href="/kontakt">Kontakt</Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </SwipeableDrawer>
            <Paper
                elevation={2}
                square
                sx={{
                    minHeight: 'calc(100vh - '+(Math.ceil((typeof headerRef.current?.scrollHeight !== "undefined"?headerRef.current.scrollHeight:0))+1)+'px)'
                }}
            >
                {children}
            </Paper>
        </>
    )
}

export default MobileLayout;