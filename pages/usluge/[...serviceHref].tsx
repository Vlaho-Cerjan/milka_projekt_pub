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
import { services, services_list, subservices } from '@prisma/client';

export const getStaticProps = async ({ params }: { params: { serviceHref: string[] } }) => {
    const page_info = await prisma.page_info.findFirst(
        {
            where: {
                page_slug: {
                    contains: params.serviceHref[params.serviceHref.length - 1]
                }
            }
        }
    );

    // get the service based on the last string in serviceHref array
    let service: services | subservices | null = await prisma.services.findFirst({
        where: {
            slug: {
                contains: params.serviceHref[params.serviceHref.length - 1]
            },
            active: 1
        }
    });

    let services: services_list[] | null = null;
    let subservices: subservices[] | null = null;

    if (service) {
        services = await prisma.services_list.findMany(
            {
                where: {
                    usluga_id: service?.id
                },
                orderBy: [
                    { highlighted: "desc" },
                    { services_order: "asc" }
                ]
            }
        );

        subservices = await prisma.subservices.findMany(
            {
                where: {
                    usluga_id: service?.id
                }
            }
        )
    }

    // if there is no service, try getting sub-service
    if (!service) {
        service = await prisma.subservices.findFirst({
            where: {
                slug: {
                    contains: params.serviceHref[params.serviceHref.length - 1]
                },
                active: 1
            }
        });

        services = await prisma.services_list.findMany(
            {
                where: {
                    pod_usluga_id: service?.id
                },
                orderBy: [
                    { highlighted: "desc" },
                    { services_order: "asc" }
                ]
            }
        );

        const doctors = null;

        const services_prices = await prisma.services_price_list.findMany(
            {
                where: {
                    service_list_id: {
                        in: [...new Set(services?.map((service) => service.id))]
                    }
                },
                orderBy: {
                    item_order: "asc"
                }
            }
        );


        return { props: { page_info, service, services, subservices, doctors, services_prices } };
    }



    const uniqueIds = [...new Set(subservices?.map(item => parseInt((item.doctors_id) ? item.doctors_id : "0")))];

    const doctors = await prisma.doctors.findMany(
        {
            where: {
                id: {
                    in: uniqueIds
                }
            }
        }
    )

    const services_prices = await prisma.services_price_list.findMany(
        {
            where: {
                service_list_id: {
                    in: [...new Set(services?.map((service) => service.id))]
                }
            },
            orderBy: {
                item_order: "asc"
            }
        }
    );
    return { props: { page_info, service, services, subservices, doctors, services_prices } };
};

export const getStaticPaths = async () => {
    // get all the services and sub-services
    const services = await prisma.services.findMany({
        where: {
            active: 1
        }
    });

    const subservices = await prisma.subservices.findMany();

    const getLastWord = (str: string) => {
        const last = str.trim().split("/").pop();
        if (last) {
            return last;
        }
        return "";
    }

    // create an array of all the paths we want to pre-render based on services and sub-services
    const paths = services.map((service) => ({
        params: { serviceHref: [getLastWord(service.slug ? service.slug : "")] },
    }));

    // add service slug to the sub-service slug based on usluga_id
    subservices.forEach((subservice) => {
        const service = services.find((service) => service.id === subservice.usluga_id);
        if (service) {
            paths.push({
                params: { serviceHref: [getLastWord(service.slug ? service.slug : ""), getLastWord(subservice.slug ? subservice.slug : "")] },
            });
        }
    });

    return { paths, fallback: false };
}

const Service = ({ page_info, service, services, subservices, doctors, services_prices }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { width } = useWindowSize();
    const { theme } = React.useContext(CustomThemeContext);
    const router = useRouter();

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