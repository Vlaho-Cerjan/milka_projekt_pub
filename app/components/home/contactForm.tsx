import { Grid, Typography, Container, Box, Button, TextField } from '@mui/material';
import React, { useContext } from 'react';
import Image from 'next/image';
import useWindowSize from '../../utility/windowSize';
import { CustomThemeContext } from '../../store/customThemeContext';
import Link from '../navigation/Link';
import { StyledContainer } from '../common/container/styledContainer';

const ContactForm = ({companyInfo}: {companyInfo: any}) => {
    const { width } = useWindowSize();
    const { theme, isDark } = useContext(CustomThemeContext);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e.currentTarget);
    };

    return (
        <StyledContainer>
            <Grid container spacing={0}>
                {width > theme.breakpoints.values.md ?
                <Grid item xs={12} md={4} maxWidth={640} sx={{ '& > span': { height: "100% !important" } }}>
                    <Image
                        src={isDark?"/images/home/skincare-dark.jpg":"/images/home/skincare.jpg"}
                        alt="pink flowers and a generic hand cream on a white table"
                        width={640}
                        height={"100%"}
                        quality={100}
                        layout="responsive"
                        objectFit="cover"
                        sizes="100vw"
                    />
                </Grid>
                :
                null
                }
                <Grid item xs={12} md={8} sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography sx={{ mb: "16px", color: theme.palette.primary.main }} variant="h5" component="h2" fontWeight={700} textTransform="uppercase">
                        Dogovorite Pregled
                    </Typography>
                    <Typography sx={{ maxWidth: "70%", textAlign: "center" }}>
                        Radi Vaše udobnosti, možete ispuniti formu kako biste nam
                        poslali e-mail sa zahtjevom za termin u našoj dermatološkoj
                        klinici Varela ili:
                    </Typography>
                    <Typography>
                        Nazovite Nas: <Link href={"tel:"+(companyInfo?.phone).replace(/[\(\)0 ]/g, '')}>{companyInfo?.phone}</Link>
                    </Typography>
                    <Typography>
                        Pošaljite nam Email: <Link href={"mailto:"+companyInfo?.email}>{companyInfo?.email}</Link>
                    </Typography>
                    <Box sx={{ maxWidth: { xs: "100%", md: "80%" }, marginTop: "24px" }} >
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="ime" fullWidth label="Ime" />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="prezime" fullWidth label="Prezime"/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="telefon" type="phone" fullWidth label="Telefon"/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name="email" fullWidth label="Email"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField name="poruka" fullWidth multiline rows={6} label="Poruka"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth variant='contained' type="submit" sx={{ fontSize: "18px", padding: "12px 0", fontWeight: "700 !important"  }} >
                                        Pošalji
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </StyledContainer>
    )
}

export default ContactForm;