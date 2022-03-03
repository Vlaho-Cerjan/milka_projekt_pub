import { Grid, Typography, Container } from '@mui/material';
import React, { useContext } from 'react';
import Image from 'next/image';
import useWindowSize from '../../utility/windowSize';
import { CustomThemeContext } from '../../store/customThemeContext';

const ContactForm = () => {
    const { width } = useWindowSize();
    const { theme } = useContext(CustomThemeContext);
    return (
        <Container sx={{ p: "64px 0 16px"}} >
            <Grid container spacing={0} sx={{ backgroundColor: "#fff" }} >
                <Grid item xs={12} md={4} maxWidth={640}>
                    <Image
                        src="/images/home/skincare.jpg"
                        alt="pink flowers and a generic hand cream on a white table"
                        width={640}
                        height={(width > theme.breakpoints.values.md)?907:300}
                        quality={100}
                        layout="responsive"
                        objectFit="cover"
                        sizes="100vw"
                    />
                </Grid>
                <Grid item xs={12} md={4} sx={{ color: "#0f7553", textAlign: "center" }}>
                    <Typography variant="h5" component="h2" fontWeight={700} textTransform="uppercase">
                        Dogovorite Pregled
                    </Typography>
                    <Typography>
                        Radi Vaše udobnosti, možete kliknuti ovdje kako biste nam 
                        poslali e-mail sa zahtjevom za termin u našoj dermatološkoj 
                        klinici Varela ili:
                    </Typography>
                    <Typography>
                        Nazovite Nas:
                        +90 (123) 456 78 99
                        Pošaljite nam Email:
                        mail@demolink.com
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    
                </Grid>
            </Grid>
        </Container>
    )
}

export default ContactForm;