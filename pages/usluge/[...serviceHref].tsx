import { Box, Card, CardContent, Container, Grid, Link, Typography } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import prisma from '../../app/utility/prisma';
import React from 'react';
import SEO from '../../app/components/common/SEO/SEO';
import { StyledContainer } from '../../app/components/common/container/styledContainer';
import ServicesGrid from '../../app/components/common/servicesGrid/servicesGrid';
import { CustomThemeContext } from '../../app/store/customThemeContext';
import useWindowSize from '../../app/utility/windowSize';
import Title from '../../app/components/common/title/title';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { doctors, page_info, services, services_list, services_price_list, subservices } from '@prisma/client';

const Service = () => {
    const { width } = useWindowSize();
    const { theme } = React.useContext(CustomThemeContext);
    const router = useRouter();

    const [page_info, setPageInfo] = React.useState<page_info | null>(null);
    const [service, setService] = React.useState<services | subservices | null>(null);
    const [services, setServices] = React.useState<services_list[] | null>(null);
    const [subservices, setSubservices] = React.useState<subservices[] | null>(null);
    const [doctors, setDoctors] = React.useState<doctors[] | null>(null);
    const [services_prices, setServicesPrices] = React.useState<services_price_list[] | null>(null);

    React.useEffect(() => {
        // fetch all data
        if (typeof router.query.serviceHref !== "undefined") {
            const serviceHref = router.query.serviceHref as string[];
            const lastWord = serviceHref[serviceHref.length - 1];

            fetch(`${process.env.NEXT_PUBLIC_API_URL}page_info/${lastWord}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        setPageInfo(data);
                    }
                })
                .catch((err) => {
                    console.log(err);
                }
                );


            fetch(`${process.env.NEXT_PUBLIC_API_URL}services/${lastWord}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        setService(data);
                        setServices(data.services_list);
                        setServicesPrices(data.services_price_list);

                        fetch(`${process.env.NEXT_PUBLIC_API_URL}subservices/${data.id}`)
                            .then((res) => res.json())
                            .then((data) => {
                                if (data) {
                                    setSubservices(data);

                                    fetch(`${process.env.NEXT_PUBLIC_API_URL}subservices/getDoctors`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify({
                                            doctors_ids: [...new Set(data.map((item: subservices) => parseInt((item.doctors_id) ? item.doctors_id : "0")))]
                                        })
                                    })
                                        .then((res) => res.json())
                                        .then((data) => {
                                            if (data) {
                                                setDoctors(data);
                                            }
                                        }
                                        )
                                        .catch((err) => {
                                            console.log(err);
                                        }
                                        );
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            }
                            );
                    }
                })
                .catch((err) => {
                    console.log(err);
                }
                );
        }

    }, [router.query.serviceHref]);

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
                <Title title={page_info?.title ? page_info?.title : ""} />
                <Box>
                    <Typography sx={{ maxWidth: "420px", textAlign: "center", margin: "0 auto" }}>
                        {service?.description}
                    </Typography>
                </Box>
                {typeof services !== "undefined" && services && services.length > 0 ?
                    <Box sx={{ mt: "32px" }}>
                        <ServicesGrid services={services} servicesPrices={services_prices} />
                    </Box>
                    : null}
                {typeof subservices !== "undefined" && subservices && subservices.length > 0 ?
                    <Box sx={{ mt: "32px" }}>
                        <Grid
                            container
                            spacing={2}
                        >
                            {subservices.map((tempService: any, index: number) => (
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
                                        href={router.asPath + tempService.slug}
                                        sx={{
                                            height: "100%",
                                            display: "block"
                                        }}
                                    >
                                        <Card
                                            component={motion.div}
                                            animate={tempService.highlighted === 1 ? { scale: [1, 1.04, 1, 1.04, 1] } : { scale: 1 }}
                                            transition={tempService.highlighted === 1 ? { duration: 1.5, ease: "easeInOut", times: [0, 0.5, 1], repeat: 2, repeatDelay: 1 } : { duration: 0.3 }}
                                            elevation={tempService.highlighted === 1 ? 4 : 2}
                                            sx={{
                                                height: "100%",
                                                background: tempService.highlighted === 1 ? theme.palette.primary.main : undefined,
                                                color: tempService.highlighted === 1 ? theme.palette.primary.contrastText : undefined,
                                            }}>
                                            <CardContent sx={{ textAlign: "center" }}>
                                                <Typography component="h3" variant={"h5"} gutterBottom>
                                                    {tempService.name}
                                                </Typography>
                                                <Typography>
                                                    {
                                                        doctors?.map((doctor: any, index: number) => {
                                                            if (typeof tempService.doctors_id !== "undefined" && tempService.doctors_id.split(",").includes(doctor.id.toString())) {
                                                                return (
                                                                    <Typography component={"span"} key={"doctor_" + index}>
                                                                        {doctor.title ? doctor.title + " " : ""}{doctor.first_name} {doctor.additional_names ? doctor.additional_names + " " : ""}{doctor.last_name}
                                                                    </Typography>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </Typography>
                                                <Typography>
                                                    {tempService.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </Grid>
                            ))
                            }
                        </Grid>
                    </Box>
                    : null}
            </StyledContainer>
        </Container >
    );
}

export default Service