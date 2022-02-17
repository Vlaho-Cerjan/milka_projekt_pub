import { Container } from '@mui/material';
import type { InferGetStaticPropsType } from 'next';
import SEO from '../app/components/common/SEO/SEO';
import { useRouter } from 'next/router';
import { getPlaiceholder } from 'plaiceholder';
import useWindowSize from '../app/utility/windowSize';
import Greeting from '../app/components/home/greeting';
import OurServices from '../app/components/home/ourServices';
import OurTeam from '../app/components/home/ourTeam';

export const getStaticProps = async () => {
  const { img } = await getPlaiceholder("/images/home/doctor-stock-transparent.png");
  return {
      props: {
          img,
      },
  };
};

const Home: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ img }) => {
  const router = useRouter();
  const { width } = useWindowSize();
  return (
    <Container maxWidth={false} sx={{ pt: "16px", pb: "16px", p: width>600?"0 !important":undefined }}>
      <SEO
          url={router.pathname}
          openGraphType="website"
          title="Ambulanta Varela | Dermatologija | Kirurgija | Ploče"
          description="Privatna dermatovenerološka i kirurška ambulanta Varela u Pločama Poduzetnički inkubator Ploče (prizemlje)"
      />
        <Greeting img={img} />
        <OurServices />
        <OurTeam />
    </Container>
  )
}

export default Home