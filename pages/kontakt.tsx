import { Box, Container, Grid, Typography } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import SEO from '../app/components/common/SEO/SEO';
import { useRouter } from 'next/router';
import useWindowSize from '../app/utility/windowSize';
import prisma from '../app/utility/prisma';
import { CustomThemeContext } from '../app/store/customThemeContext';
import React from 'react';
import dynamic from 'next/dynamic';
import Title from '../app/components/common/title/title';
import Link from '../app/components/navigation/Link';
import { StyledContainer } from '../app/components/common/container/styledContainer';
import SingleContactForm from '../app/components/common/singleContactForm';
import { MailOutlineOutlined, Phone, WhatsApp } from '@mui/icons-material';

const MapWithNoSSR = dynamic(() => import('../app/components/map/map'), {
    ssr: false,
});

export const getStaticProps: GetStaticProps = async () => {
    const companyInfo = await prisma.company_info.findFirst();
    const page_info = await prisma.page_info.findFirst(
        {
            where: {
                page_slug: {
                    contains: "/kontakt"
                }
            }
        }
    );
    const employes = await prisma.employes.findMany(
        {
            where: {
                employe_title: {
                    contains: "doktor"
                }
            }
        }
    );
    const reception = await prisma.employes.findFirst(
        {
            where: {
                employe_title: {
                    contains: "recepcija"
                }
            }
        }
    );
    return { props: { reception, employes, companyInfo, page_info } };
};

const Kontakt = ({ reception, employes, companyInfo, page_info }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { width } = useWindowSize();
    const { theme } = React.useContext(CustomThemeContext);

    return (
        <Container maxWidth={false} sx={{ pt: "16px", pb: "16px", p: width > 600 ? "0 !important" : undefined }}>
            {<SEO page_info={page_info} />
            }
            <StyledContainer>
                <Title title={page_info.title} />
                <Grid sx={{
                    paddingBottom: "32px",
                    alignItems: "center",

                    [theme.breakpoints.down('md')]: {
                        paddingBottom: "24px",
                        flexDirection: "column-reverse",
                        alignItems: "flex-start",
                    },

                    [theme.breakpoints.down('sm')]: {
                        paddingBottom: "16px",
                    }
                }} container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <Typography variant="h5" component="h2" fontWeight="600" color="primary.main" pb="16px">
                                Impressum
                            </Typography>
                            <Typography
                                variant="h6"
                                component="h3"
                            >
                                Doktori Varela
                            </Typography>
                            {
                                typeof employes !== "undefined" && employes.length > 0 ?
                                    <Box sx={{ mt: "4px" }}>
                                        <Typography>
                                            {employes[0].title + " " + employes[0].first_name + " " + employes[0].aditional_names + " " + employes[0].last_name}
                                        </Typography>
                                        <Typography>
                                            {employes[1].title + " " + employes[1].first_name + " " + employes[1].aditional_names + " " + employes[1].last_name}
                                        </Typography>
                                        <Link
                                            href={"tel:"+(employes[0].phone).replace(/[\(\)0 ]/g, '')}
                                            sx={{
                                                color: "text.primary",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Phone sx={{ fontSize: "18px", mr: "4px" }} />
                                            {employes[0].phone}
                                        </Link>
                                        <Link
                                            href={"mailto:"+employes[0].email}
                                            sx={{
                                                color: "text.primary",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <MailOutlineOutlined sx={{ fontSize: "18px", mr: "8px" }} />
                                            {employes[0].email}
                                        </Link>
                                    </Box>
                                    : null
                            }
                            <Typography
                                sx={{ mt: "16px" }}
                                variant="h6"
                                component="h3"
                            >
                                Recepcija
                            </Typography>
                            {
                                typeof reception !== "undefined" && reception ?
                                    <Box sx={{ mt: "4px" }}>
                                        <Typography>
                                            { reception.first_name + " " + reception.aditional_names + " " + reception.last_name}
                                        </Typography>
                                        <Link
                                            href={"https://wa.me/"+(reception.phone).replace(/[\+\(\)0 ]/g, '')}
                                            sx={{
                                                color: "text.primary",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <WhatsApp sx={{ fontSize: "18px", mr: "4px" }} />
                                            {reception.phone}
                                        </Link>
                                        <Link
                                            href={"mailto:"+reception.email}
                                            sx={{
                                                color: "text.primary",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <MailOutlineOutlined sx={{ fontSize: "18px", mr: "8px" }} />
                                            {reception.email}
                                        </Link>
                                    </Box>
                                    : null
                            }
                            <Typography
                                sx={{ mt: "16px" }}
                                variant="h6"
                                component="h3"
                            >
                                Ambulanta
                            </Typography>
                            {
                                typeof companyInfo !== "undefined" && companyInfo ?
                                    <Box sx={{ mt: "4px" }}>
                                        <Typography>
                                            {companyInfo.name}
                                        </Typography>
                                        <Typography sx={{ maxWidth: "320px" }}>
                                            {companyInfo.address}
                                        </Typography>
                                        {
                                        /*<Link
                                            href={"tel:"+(companyInfo.phone).replace(/[\(\)0 ]/g, '')}
                                            sx={{
                                                color: "text.primary",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Phone sx={{ fontSize: "18px", mr: "4px" }} />
                                            {companyInfo.phone}
                                        </Link>
                                        <Link
                                            href={"mailto:"+companyInfo.email}
                                            sx={{
                                                color: "text.primary",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <MailOutlineOutlined sx={{ fontSize: "18px", mr: "8px" }} />
                                            {companyInfo.email}
                                        </Link>
                                        */
                                        }
                                    </Box>
                                    : null
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <SingleContactForm />
                    </Grid>
                </Grid>
            </StyledContainer>
            <MapWithNoSSR coords={companyInfo?.coords.split(",")} link={companyInfo?.address_url} title={companyInfo?.title} />
        </Container >
    );
}

export default Kontakt