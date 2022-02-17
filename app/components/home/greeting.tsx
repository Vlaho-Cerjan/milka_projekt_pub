import { Box, Container, Typography, Button } from '@mui/material';
import Link from 'next/link';
import React, { useContext } from 'react';
import { CustomThemeContext } from '../../store/customThemeContext';
import useWindowSize from '../../utility/windowSize';
import Image from 'next/image';
import SendIcon from '@mui/icons-material/Send';

interface GreetingProps {
    img: {
        height: number;
        src: string;
        width: number;
        type?: string;
    },
}

const Greeting = ({ img }: GreetingProps) => {
    const { width } = useWindowSize();
    const { theme, isDark } = useContext(CustomThemeContext);

    return (
        <Box sx={{
        position: "relative",
        overflow: "hidden",
        display: "block",
        lineHeight: 0,
        backgroundColor: theme.palette.primary.main,
        maxHeight: "700px",
        }}
        >
        {(width>600)?
            (<>
                <Image
                    alt={"stock photo of a doctor with "+(isDark?'blue':'green')+" background"}
                    quality={90}
                    layout="responsive"
                    {...img}
                />
                <Container
                    sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    p: width>1200?"0 calc(50% - 552px) !important":"0 48px !important"
                    }}
                    maxWidth={false}
                >
                    <Box sx={{
                    padding: "0",
                    maxWidth: "50%",
                    display: "flex",
                    height: "100%",
                    alignItems: "center"
                    }}>
                    <Container maxWidth={false} sx={{ p: "0 !important" }}>
                        <Typography
                        sx={{
                            mb: "16px",
                            textTransform: "uppercase",
                            //wordBreak: "break-word"
                        }}
                        lineHeight={1}
                        fontSize={width<789?"1.5rem":"2.5rem"}
                        fontWeight={600}
                        fontFamily="'El Messiri', sans-serif"
                        color={isDark?"black":"white"}
                        component="h1"
                        >
                        Varela Dermatologija
                        </Typography>
                        <Typography sx={{ mb: "16px" }} fontSize={width<789?"1rem":"1.5rem"} color={isDark?"black":"white"}>
                        Pružamo vrhunske usluge dermatologije, kozmetologije, kirurgije i venerologije.
                        </Typography>
                        <Button
                        variant="contained"
                        size="large"
                        sx={{
                            p: 0,
                            color: 'primary.main',
                            bgcolor: isDark?"black":"white",
                            fontWeight: "600",
                            '&:hover': {
                            bgcolor: isDark?"rgba(0,0,0,0.8)":"rgba(255,255,255,0.9)",
                            },
                        }}>
                        <Link href="/kontakt">
                            <a>
                            <Box sx={{ p: "5px 15px", display: "flex", alignItems: "center", fontSize: width<789?"1rem":"1.2rem" }}>
                                Dogovori Pregled
                                <SendIcon sx={{ ml: "12px" }} />
                            </Box>
                            </a>
                        </Link>
                        </Button>
                    </Container>
                    </Box>
                </Container>
                </>)
                :
                (<>
                <Container sx={{ p: "64px 9%", textAlign: "center"}}>
                    <Typography
                    sx={{
                        mb: "16px",
                        textTransform: "uppercase",
                        wordBreak: "break-word"
                    }}
                    lineHeight={1}
                    fontSize={width<420?"2rem":"2.5rem"}
                    fontWeight={600}
                    fontFamily="'El Messiri', sans-serif"
                    color={isDark?"black":"white"}
                    >
                    Varela Dermatologija
                    </Typography>
                    <Typography sx={{ mb: "16px" }} fontSize="1.3rem" color={isDark?"black":"white"}>
                    Pružamo vrhunske usluge dermatologije, kozmetologije, kirurgije i venerologije.
                    </Typography>
                    <Button
                    variant="contained"
                    size="large"
                    sx={{
                        p: 0,
                        color: 'primary.main',
                        bgcolor: isDark?"black":"white",
                        fontWeight: "600",
                        '&:hover': {
                        bgcolor: isDark?"rgba(0,0,0,0.8)":"rgba(255,255,255,0.9)",
                        },
                    }}>
                    <Link href="/kontakt">
                        <a>
                        <Box sx={{ p: "5px 15px", display: "flex", alignItems: "center" }}>
                            Dogovori Pregled
                            <SendIcon sx={{ ml: "12px" }} />
                        </Box>
                        </a>
                    </Link>
                    </Button>
                </Container>
            </>)
        }
        </Box>
    )
}

export default Greeting;