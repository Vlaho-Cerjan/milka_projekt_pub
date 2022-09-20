import { Box, Container, Typography } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import SEO from '../app/components/common/SEO/SEO';
import useWindowSize from '../app/utility/windowSize';
import prisma from '../app/utility/prisma';
import { CustomThemeContext } from '../app/store/customThemeContext';
import React from 'react';
import Title from '../app/components/common/title/title';
import { StyledContainer } from '../app/components/common/container/styledContainer';
import ServicesGrid from '../app/components/common/servicesGrid/servicesGrid';

export const getStaticProps: GetStaticProps = async () => {
    const page_info = await prisma.page_info.findFirst(
        {
            where: {
                page_slug: {
                    contains: "/dermatologija"
                }
            }
        }
    );

    const dermatologija = await prisma.services.findFirst(
        {
            where: {
                slug: {
                    contains: "/dermatologija"
                }
            }
        }
    );

    const services = await prisma.services_list.findMany(
        {
            where: {
                usluga_id: dermatologija?.id
            },
            orderBy: [
                { highlighted: "desc" },
                { services_order: "asc" }
            ]
        }
    );

    const services_subprices = await prisma.services_price_list.findMany(
        {
            where: {
                service_list_id: {
                    in: [...new Set(services.map((service) => service.id))]
                }
            }
        }
    );
    return { props: { page_info, dermatologija, services, services_subprices } };
};

const Dermatologija = ({ page_info, dermatologija, services, services_subprices }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { width } = useWindowSize();
    const { theme } = React.useContext(CustomThemeContext);

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
                        {dermatologija.description}
                    </Typography>
                </Box>
                <Box sx={{ mt: "32px" }}>
                    <ServicesGrid services={services} servicesSubprices={services_subprices} />
                </Box>
            </StyledContainer>
        </Container >
    );
}

export default Dermatologija