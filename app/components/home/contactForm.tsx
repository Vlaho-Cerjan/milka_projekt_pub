import { Grid, Typography, Box } from '@mui/material';
import { useContext } from 'react';
import Image from 'next/image';
import useWindowSize from '../../utility/windowSize';
import { CustomThemeContext } from '../../store/customThemeContext';
import Link from '../navigation/Link';
import { StyledContainer } from '../common/container/styledContainer';
import SingleContactForm from '../common/singleContactForm';
import React from 'react';

const ContactForm = ({ companyInfo }: { companyInfo: any }) => {
    const { width } = useWindowSize();
    const { theme, isDark } = useContext(CustomThemeContext);

    return (
        <StyledContainer>
            <Grid container spacing={0}>
                {width > theme.breakpoints.values.md ?
                    <Grid item xs={12} md={4} sx={{ width: "100%", maxWidth: "640px", position: "relative" }}>
                        <Image
                            src={process.env.NEXT_PUBLIC_IMG_URL + (isDark ? "/images/home/skincare-dark.jpg" : "/images/home/skincare.jpg")}
                            alt="pink flowers and a generic hand cream on a white table"
                            quality={100}
                            fill
                            sizes="100vw"
                            style={{
                                borderRadius: isDark ? "22px": 0
                            }}
                        />
                    </Grid>
                    :
                    null
                }
                <Grid item xs={12} md={8} sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography sx={{ mb: "16px", color: theme.palette.primary.main }} variant="h5" component="h2" fontWeight={700} textTransform="uppercase">
                        Dogovorite Termin
                    </Typography>
                    <Typography sx={{ maxWidth: "70%", textAlign: "center" }}>
                        Radi Vaše udobnosti, možete ispuniti formu kako biste nam
                        poslali e-mail sa zahtjevom za termin u našoj dermatološkoj
                        klinici Varela ili:
                    </Typography>
                    <Typography>
                        Nazovite Nas: <Link href={"tel:" + (companyInfo?.phone).replace(/[\(\)0 ]/g, '')}>{companyInfo?.phone}</Link>
                    </Typography>
                    <Typography>
                        Pošaljite nam Email: <Link href={"mailto:" + companyInfo?.email}>{companyInfo?.email}</Link>
                    </Typography>
                    <Box sx={{ maxWidth: { xs: "100%", md: "80%" }, marginTop: "24px" }} >
                        <SingleContactForm />
                    </Box>
                </Grid>
            </Grid>
        </StyledContainer>
    );
}

export default ContactForm;