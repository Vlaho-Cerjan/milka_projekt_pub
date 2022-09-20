import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import SEO from '../app/components/common/SEO/SEO';
import { useRouter } from 'next/router';
import useWindowSize from '../app/utility/windowSize';
import prisma from '../app/utility/prisma';
import { CustomThemeContext } from '../app/store/customThemeContext';
import React from 'react';
import Title from '../app/components/common/title/title';
import { StyledContainer } from '../app/components/common/container/styledContainer';
import { ExpandMore } from '@mui/icons-material';

export const getStaticProps: GetStaticProps = async () => {
    const page_info = await prisma.page_info.findFirst(
        {
            where: {
                page_slug: {
                    contains: "/faq"
                }
            }
        }
    );

    const faq = await prisma.faq.findMany(
        {
            orderBy: {
                faq_order: "asc"
            }
        }
    );

    return { props: { page_info, faq } };
};

const FAQ = ({ page_info, faq }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { width } = useWindowSize();
    const { theme } = React.useContext(CustomThemeContext);

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

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
                    {typeof faq !== "undefined" && faq.length > 0 ?
                        faq.map((item: any, index: number) => {
                            return (
                                <Accordion key={"faq_"+index} expanded={expanded === 'panel'+index} onChange={handleChange('panel'+index)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls={"panel"+index+"bh-content"}
                                        id={"panel"+index+"bh-header"}
                                        sx={{
                                            '& .MuiAccordionSummary-content': {
                                                margin: "24px 0",

                                                [theme.breakpoints.down("md")]: {
                                                    margin: "18px 0",
                                                },

                                                [theme.breakpoints.down("sm")]: {
                                                    margin: "12px 0",
                                                }
                                            }
                                        }}
                                    >
                                        <Typography sx={{ fontSize: "22px" }} variant='h6' component="h3">
                                            {item.title}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography
                                            sx={{ fontSize: "16px" }}
                                            dangerouslySetInnerHTML={{ __html: item.content }}
                                        />
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })
                        :
                        null
                    }
                </Box>

            </StyledContainer>
        </Container >
    );
}

export default FAQ