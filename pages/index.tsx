import { Box, Container, Typography } from '@mui/material';
import type { InferGetStaticPropsType } from 'next';
import SEO from '../app/components/common/SEO/SEO';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';
import useWindowSize from '../app/utility/windowSize';
import { useContext } from 'react';
import { CustomThemeContext } from '../app/store/customThemeContext';

export const getStaticProps = async () => {
  const { img } = await getPlaiceholder("/images/doctor-stock-transparent.png");
  return {
    props: {
      img,
    },
  };
};

const Home:React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ img }) => {
  const router = useRouter();
  const { width } = useWindowSize();
  const { theme, isDark } = useContext(CustomThemeContext);
  return (
    <Container sx={{ pt: "16px", pb: "16px" }}>
      <SEO
          url={router.pathname}
          openGraphType="website"
          title="Ambulanta Varela | Dermatologija | Kirurgija | Ploče"
          description="Privatna dermatovenerološka i kirurška ambulanta Varela u Pločama Poduzetnički inkubator Ploče (prizemlje)"
      />
        <Box sx={{
          position: "relative",
          overflow: "hidden",
          display: "block",
          lineHeight: 0,
          backgroundColor: theme.palette.primary.main
          }}
        >
          {(width>600)?
            (<>
              <Image
                alt="stock photo of a doctor with blue background"
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
                  p: 0,
                }}
              >
                <Box sx={{
                  padding: "16px",
                  maxWidth: "50%",
                  display: "flex",
                  height: "100%",
                  alignItems: "center"
                }}>
                  <Typography color={isDark?"black":"white"}>
                    Dobrodošli na web stranicu ambulante Varela. Pružamo vrhunske usluge dermatologije, kozmetologije kirurgije i venerologije.
                  </Typography>
                </Box>
              </Container>
            </>)
            :
            (<>
              <Container
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0,
                  bottom: 0,
                  p: 0,
                }}
              >

              </Container>
            </>)
          }
        </Box>
    </Container>
  )
}

export default Home