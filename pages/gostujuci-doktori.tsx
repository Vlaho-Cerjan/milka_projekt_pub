import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import SEO from '../app/components/common/SEO/SEO';
import useWindowSize from '../app/utility/windowSize';
import prisma from '../app/utility/prisma';
import { CustomThemeContext } from '../app/store/customThemeContext';
import React from 'react';
import Title from '../app/components/common/title/title';
import { StyledContainer } from '../app/components/common/container/styledContainer';
import ServicesGrid from '../app/components/common/servicesGrid/servicesGrid';
import { motion } from 'framer-motion';
import Link from '../app/components/navigation/Link';

export const getStaticProps: GetStaticProps = async () => {
    const page_info = await prisma.page_info.findFirst(
        {
            where: {
                page_slug: {
                    contains: "/gostujuci-doktori"
                }
            }
        }
    );

    const gostujuciDoktori = await prisma.services.findFirst(
        {
            where: {
                slug: {
                    contains: "/gostujuci-doktori"
                }
            }
        }
    );

    const subservices = await prisma.subservices.findMany(
        {
            where: {
                usluga_id: gostujuciDoktori?.id
            }
        }
    )

    const uniqueIds = [...new Set(subservices.map(item => parseInt((item.doctors_id)?item.doctors_id:"0")))];

    const doctors = await prisma.doctors.findMany(
        {
            where: {
                id: {
                    in: uniqueIds
                }
            }
        }
    )

    return { props: { page_info, gostujuciDoktori, subservices, doctors } };
};

const GostujuciDoktori = ({ page_info, gostujuciDoktori, subservices, doctors }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { width } = useWindowSize();
    const { theme } = React.useContext(CustomThemeContext);

    console.log(doctors);

    return (
        <Container maxWidth={false} sx={{ pt: "16px", pb: "16px", p: width > 600 ? "0 !important" : undefined }}>
            {<SEO page_info={page_info} />
            }
            <StyledContainer
                sx={{
                    pb: "64px",

                    [theme.breakpoints.down("md")]: {
                        pb: "32px",
                    },

                    [theme.breakpoints.down("sm")]: {
                        pb: "16px",
                    }
                }}
            >
                <Title title={page_info.title} />
                <Box>
                    <Typography sx={{ maxWidth: "420px", textAlign: "center", margin: "0 auto" }}>
                        {gostujuciDoktori.description}
                    </Typography>
                </Box>
                <Box sx={{ mt: "32px" }}>
                    <Grid
                        container
                        spacing={2}
                    >
                        {subservices.map((service: any, index: number) => (
                            <Grid
                                component={motion.div}
                                whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
                                key={"derm_price_list_" + index}
                                item
                                xs={12}
                                sm={6}
                                md={4}
                            >
                                <Link
                                    href={service.slug}
                                    sx={{
                                        height: "100%",
                                        display: "block"
                                    }}
                                >
                                    <Card
                                        component={motion.div}
                                        animate={service.highlighted === 1 ? { scale: [1, 1.04, 1, 1.04, 1] } : { scale: 1 }}
                                        transition={service.highlighted === 1 ? { duration: 1.5, ease: "easeInOut", times: [0, 0.5, 1], repeat: 2, repeatDelay: 1 } : { duration: 0.3 }}
                                        elevation={service.highlighted === 1 ? 4 : 2}
                                        sx={{
                                            height: "100%",
                                            background: service.highlighted === 1 ? theme.palette.primary.main : undefined,
                                            color: service.highlighted === 1 ? theme.palette.primary.contrastText : undefined,
                                        }}>
                                        <CardContent sx={{ textAlign: "center" }}>
                                            <Typography component="h3" variant={"h5"} gutterBottom>
                                                {service.name}
                                            </Typography>
                                            <Typography>
                                                {
                                                    doctors.map((doctor: any, index: number) => {
                                                        if (typeof service.doctors_id !== "undefined" && service.doctors_id.split(",").includes(doctor.id.toString())) {
                                                            return (
                                                                <Typography key={"doctor_" + index}>
                                                                    {doctor.title ? doctor.title + " " : ""}{doctor.first_name} {doctor.additional_names ? doctor.additional_names + " " : ""}{doctor.last_name}
                                                                </Typography>
                                                            )
                                                        }
                                                    })
                                                }
                                            </Typography>
                                            <Typography>
                                                {service.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        ))
                        }
                    </Grid>
                </Box>
            </StyledContainer>
        </Container >
    );
}

export default GostujuciDoktori