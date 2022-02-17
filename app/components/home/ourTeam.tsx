import { Container, Typography } from '@mui/material';
import React from 'react';

const OurTeam = () => {

    return(
        <Container sx={{ p: "64px 0 16px" }}>
            <Typography sx={{ pb: "32px" }} color="primary.main" textAlign="center" variant="h3" component="h2">
                Naš Tim
            </Typography>
        </Container>
    )
}

export default OurTeam;