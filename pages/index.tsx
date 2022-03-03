import { Container } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import SEO from '../app/components/common/SEO/SEO';
import { useRouter } from 'next/router';
import useWindowSize from '../app/utility/windowSize';
import Greeting from '../app/components/home/greeting';
import OurServices from '../app/components/home/ourServices';
import OurTeam from '../app/components/home/ourTeam';
import prisma from '../app/utility/prisma';
//import OurNews from '../app/components/home/ourNews';
import MissionAndVision from '../app/components/home/missionAndVision';
import ContactForm from '../app/components/home/contactForm';


export const getStaticProps: GetStaticProps = async () => {
  const services = await prisma.services.findMany();
  const news = await prisma.blog.findMany({
    take: 4,
  })
  const employes = await prisma.employes.findMany();

  return { props: { services, news, employes } };
};

const Home = ({ services, news, employes }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
        <Greeting />
        <MissionAndVision />
        {
        //<OurNews news={news} />
        }
        <OurServices services={services} />
        <ContactForm />
        <OurTeam employes={employes} />
    </Container>
  )
}

export default Home