import { Container, Typography, Grid, Card, CardActions, styled, CardContent, Button} from '@mui/material';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const StyledCard = styled(Card)(() => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: "16px",
}))

const StyledCardContet = styled(CardContent)(() => ({
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
}))

const OurServices = () => {

    return (
        <Container sx={{ p: "64px 0 16px" }}>
            <Typography sx={{ pb: "32px" }} color="primary.main" textAlign="center" variant="h3" component="h2">
                Naše Usluge
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <StyledCard variant="outlined">
                        <Image
                            src="/images/home/dermatologija.jpg"
                            alt="dermatolog uklanja madež sa ramena pacijentice"
                            width={1920}
                            height={1080}
                            layout="responsive"
                            objectFit="cover"
                            sizes="(max-width: 600px) 100vw,
                            (max-width: 750px) 342px,
                            (max-width: 900px) 417px,
                            (max-width: 1200px) 373px,
                            276px"
                        />
                        <StyledCardContet>
                            <Typography
                                component="h3"
                                variant="h5"
                                textAlign="center"
                                sx={{ pb: "16px", textTransform: "uppercase" }}
                            >
                                Dermatologija
                            </Typography>
                            <Typography
                                textAlign="center"
                            >
                                Dermatologija je grana medicine koja se bavi istraživanjem, dijagnostikom i liječenjem kože i njenih dodataka te vidljivih sluznica.
                            </Typography>
                        </StyledCardContet>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button variant="contained">
                                <Link href="/dermatologija">
                                    Saznaj Više
                                </Link>
                            </Button>
                        </CardActions>
                    </StyledCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <StyledCard variant="outlined">
                        <Image
                            src="/images/home/kozmetologija.jpg"
                            alt="kozmetolog priprema tretman lica za pacijenticu"
                            width={1920}
                            height={1080}
                            layout="responsive"
                            objectFit="cover"
                            sizes="(max-width: 600px) 100vw,
                            (max-width: 750px) 342px,
                            (max-width: 900px) 417px,
                            (max-width: 1200px) 373px,
                            276px"
                        />
                        <StyledCardContet>
                            <Typography
                                component="h3"
                                variant="h5"
                                textAlign="center"
                                sx={{ pb: "16px", textTransform: "uppercase" }}
                            >
                                Kozmetologija
                            </Typography>
                            <Typography
                                textAlign="center"
                            >
                                Kozmetologija je proučavanje i umjetnost korištenja kozmetike ili proizvoda u svrhu uljepšavanja fizičkog izgleda.
                            </Typography>
                        </StyledCardContet>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button variant="contained">
                                <Link href="/kozmetologija">
                                    Saznaj Više
                                </Link>
                            </Button>
                        </CardActions>
                    </StyledCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <StyledCard variant="outlined">
                        <Image
                            src="/images/home/kirurgija.jpg"
                            alt="kirurg sa kirurskim svijelom na glavi obavlja operaciju u sali"
                            width={1920}
                            height={1080}
                            layout="responsive"
                            objectFit="cover"
                            sizes="(max-width: 600px) 100vw,
                            (max-width: 750px) 342px,
                            (max-width: 900px) 417px,
                            (max-width: 1200px) 373px,
                            276px"
                        />
                        <StyledCardContet>
                            <Typography
                                component="h3"
                                variant="h5"
                                textAlign="center"
                                sx={{ pb: "16px", textTransform: "uppercase" }}
                            >
                                Kirurgija
                            </Typography>
                            <Typography
                                textAlign="center"
                            >
                                Kirurgija je grana medicine koja koristi ručne i instrumentalne operativne tehnike na pacijentima da bi istražila i/ili tretirala patološka stanja.
                            </Typography>
                        </StyledCardContet>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button variant="contained">
                                <Link href="/kirurgija">
                                    Saznaj Više
                                </Link>
                            </Button>
                        </CardActions>
                    </StyledCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <StyledCard variant="outlined">
                        <Image
                            src="/images/home/gostujuci-doktori.jpg"
                            alt="doktori razgovaraju medusobno u hodniku sa poslovnom ženom"
                            width={1920}
                            height={1080}
                            layout="responsive"
                            objectFit="cover"
                            sizes="(max-width: 600px) 100vw,
                            (max-width: 750px) 342px,
                            (max-width: 900px) 417px,
                            (max-width: 1200px) 373px,
                            276px"
                        />
                        <StyledCardContet>
                            <Typography
                                component="h3"
                                variant="h5"
                                textAlign="center"
                                sx={{
                                    pb: "16px",
                                    textTransform: "uppercase",
                                    '> span': {
                                        position: "relative"
                                    },
                                    '> span::after': {
                                        content: "'/'",
                                        position: "absolute",
                                        top: "0",
                                        right: "3px",
                                        fontSize: "7px",
                                        fontWeight: 700,
                                        transform: "rotateX(50deg)",
                                    }
                                }}
                            >
                                Gostuju<span>c</span>i Doktori
                            </Typography>
                            <Typography
                                textAlign="center"
                            >
                                Naša ambulanta prima i gostujuće doktore koji obavljaju vlastite usluge unutar prostora Ambulante Varela.
                            </Typography>
                        </StyledCardContet>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button variant="contained">
                                <Link href="/gostujuci-doktori">
                                    Saznaj Više
                                </Link>
                            </Button>
                        </CardActions>
                    </StyledCard>
                </Grid>
            </Grid>
        </Container>
    )
}

export default OurServices;