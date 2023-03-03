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
import { company_info, employees, page_info } from '@prisma/client';

const MapWithNoSSR = dynamic(() => import('../app/components/map/map'), {
    ssr: false,
});

const Kontakt = () => {
    const router = useRouter();
    const { width } = useWindowSize();
    const { theme } = React.useContext(CustomThemeContext);

    const [reception, setReception] = React.useState<employees | null>(null);
    const [employees, setEmployees] = React.useState<employees[] | null>(null);
    const [companyInfo, setCompanyInfo] = React.useState<company_info | null>(null);
    const [page_info, setPageInfo] = React.useState<page_info | null>(null);

    React.useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL + "company_info")
            .then(res => res.json())
            .then(data => {
                setCompanyInfo(data);
            }
            )
            .catch(err => console.log(err));

        fetch(process.env.NEXT_PUBLIC_API_URL + "employees/doktor")
            .then(res => res.json())
            .then(data => {
                setEmployees(data);
            }
            )
            .catch(err => console.log(err));

        fetch(process.env.NEXT_PUBLIC_API_URL + "employees/recepcija")
            .then(res => res.json())
            .then(data => {
                setReception(data[0]);
            }
            )
            .catch(err => console.log(err));

        fetch(process.env.NEXT_PUBLIC_API_URL + "page_info/kontakt")
            .then(res => res.json())
            .then(data => {
                setPageInfo(data);
            }
            )
            .catch(err => console.log(err));

        return () => {
            setCompanyInfo(null);
            setEmployees(null);
            setReception(null);
            setPageInfo(null);
        }
    }, []);

    return (
        <Container maxWidth={false} sx={{ pt: "16px", pb: "16px", p: width > 600 ? "0 !important" : undefined }}>
            {<SEO page_info={page_info} />
            }
            <StyledContainer>
                <Title title={page_info && page_info.title ? page_info.title : ""} />
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
                                typeof employees !== "undefined" && employees && employees.length > 0 ?
                                    <Box sx={{ mt: "4px" }}>
                                        <Typography>
                                            {employees[0].title + " " + employees[0].first_name + " " + employees[0].aditional_names + " " + employees[0].last_name}
                                        </Typography>
                                        <Typography>
                                            {employees[1].title + " " + employees[1].first_name + " " + employees[1].aditional_names + " " + employees[1].last_name}
                                        </Typography>
                                        {employees[0].phone ?
                                        <Link
                                            href={"tel:"+(employees[0].phone).replace(/[\(\)0 ]/g, '')}
                                            sx={{
                                                color: "text.primary",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Phone sx={{ fontSize: "18px", mr: "4px" }} />
                                            {employees[0].phone}
                                        </Link>
                                        : null}
                                        <Link
                                            href={"mailto:"+employees[0].email}
                                            sx={{
                                                color: "text.primary",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <MailOutlineOutlined sx={{ fontSize: "18px", mr: "8px" }} />
                                            {employees[0].email}
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
                                        {reception.phone ?
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
                                        : null}
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
            {companyInfo ?
            <MapWithNoSSR coords={companyInfo.coords.split(",")} link={companyInfo.address_url ? companyInfo.address_url : ""} title={companyInfo.title ? companyInfo.title : ""} />
            : null}
        </Container >
    );
}

export default Kontakt