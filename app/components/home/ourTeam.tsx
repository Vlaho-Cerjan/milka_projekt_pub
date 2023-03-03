import { Box, Button, Card, CardActions, CardContent, Container, Grid, styled, Typography } from '@mui/material';
import React, { useContext } from 'react';
import Title from '../common/title/title';
import Image from 'next/image';
import Link from 'next/link';
import { CustomThemeContext } from '../../store/customThemeContext';
import { StyledContainer } from '../common/container/styledContainer';
import { employees } from '@prisma/client';

interface OurTeamProps {
    employees: employees[]
}

const StyledCard = styled(Card)(() => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center",
    padding: "16px",
    'img.resImg': {
        border: "1px solid transparent !important",
    }
}))

const StyledCardContent = styled(CardContent)(() => ({
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
}))

const OurTeam = ({ employees }: OurTeamProps) => {
    const { theme } = useContext(CustomThemeContext);

    const [imageWidth, setImageWidth] = React.useState<number | null>(0);

    React.useEffect(() => {
        // get width of image on first render
        if (window) {
            const imageRef = document.getElementById("employee_1");
            if (imageRef) {
                setImageWidth(imageRef.clientWidth);
            }
            // set event listener on window resize
            window.addEventListener('resize', () => {
                const imageRef = document.getElementById("employee_1");
                if (imageRef && imageRef.clientWidth !== imageWidth) {
                    setImageWidth(imageRef.clientWidth);
                }
            });
        }

        return () => {
            // remove event listener on window resize
            window.removeEventListener('resize', () => {
                const imageRef = document.getElementById("employee_1");
                if (imageRef) {
                    setImageWidth(imageRef.clientWidth);
                }
            });
        }
    }, [employees]);

    const dataEmployes = (
        employees.map((employe, index) => {
            return (
                <Grid key={'employee_' + employe.id} item xs={12} sm={6} md={4} lg={3}>
                    <StyledCard
                        variant="outlined"
                    >
                        <Box sx={{
                            position: "relative",
                            height: imageWidth + "px",
                            'img.resImg': {
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: "50%"
                            }
                        }}>
                            <Image
                                src={employe.img_src ? employe.img_src : ""}
                                alt={employe.alt ? employe.alt : ""}
                                fill
                                quality={90}
                                id={"employee_" + employe.id}
                                className="resImg"
                            />
                        </Box>
                        <StyledCardContent>
                            <Box>
                                <Typography
                                    component="h3"
                                    variant="h5"
                                    textAlign="center"
                                    sx={{ pb: "16px", textTransform: "capitalize" }}
                                >
                                    {(employe.title ? employe.title : "") + " " + employe.first_name + " " + (employe.aditional_names ? employe.aditional_names : "") + " " + employe.last_name}
                                </Typography>
                                {employe.employee_title ?
                                    <Typography
                                        textAlign="center"
                                    >
                                        {employe.employee_title}
                                    </Typography>
                                    : null
                                }
                            </Box>
                            {employe.bio ?
                                <Typography
                                    textAlign="center"
                                >
                                    {employe.bio}
                                </Typography>
                                : null
                            }
                        </StyledCardContent>
                        {/*<CardActions sx={{ justifyContent: "center" }}>
                            <Button
                                sx={{
                                    fontFamily: "'Oswald', sans-serif",
                                    fontWeight: "700 !important",
                                    fontSize: "1.1rem",
                                    letterSpacing: "0.5px",
                                }}
                                variant="contained"
                            >
                                <Link href={employe.slug?employe.slug.trim():"/"}>
                                    Saznajte Više
                                </Link>
                            </Button>
                        </CardActions>
                        */}
                    </StyledCard>
                </Grid>
            )
        })
    )

    return (
        <StyledContainer>
            <Title title="Naš Tim" />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography sx={{ maxWidth: { sm: "100%", md: "60%" } }} textAlign="center" pb="16px">
                    U Varela dermatološkoj klinici imamo dermatologinju koja je inovator u kozmetičkom i dermatološkom području, kao i vrsnoga kirurga i gostujuće doktore.
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {dataEmployes}
            </Grid>
        </StyledContainer>
    )
}

export default OurTeam;