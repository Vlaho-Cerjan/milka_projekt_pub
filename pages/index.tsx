import { Container } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import SEO from '../app/components/common/SEO/SEO';
import useWindowSize from '../app/utility/windowSize';
import Greeting from '../app/components/home/greeting';
import OurServices from '../app/components/home/ourServices';
import OurTeam from '../app/components/home/ourTeam';
import prisma from '../app/utility/prisma';
//import OurNews from '../app/components/home/ourNews';
import MissionAndVision from '../app/components/home/missionAndVision';
import ContactForm from '../app/components/home/contactForm';

import dynamic from 'next/dynamic';
import HowToFindUs from '../app/components/home/howToFindUs';
import React from 'react';

const MapWithNoSSR = dynamic(() => import('../app/components/map/map'), {
  ssr: false,
});

export const getStaticProps: GetStaticProps = async () => {
  const services = await prisma.services.findMany({
    where: {
      active: 1
    },
    orderBy: {
      item_order: "asc"
    }
  });
  const news = await prisma.blog.findMany({
    take: 4,
  })
  const employees = await prisma.employees.findMany({
    where: {
      active: 1
    },
  });
  const companyInfo = await prisma.company_info.findFirst();
  const page_info = await prisma.page_info.findFirst(
    {
      where: {
        page_slug: "/"
      }
    }
  );

  return { props: { services, news, employees, companyInfo, page_info } };
};

const Home = ({ services, news, employees, companyInfo, page_info }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { width } = useWindowSize();

  return (
    <Container maxWidth={false} sx={{ pt: "16px", pb: "16px", p: width > 600 ? "0 !important" : undefined }}>
      {<SEO page_info={page_info} />
      }
      <Greeting />
      <MissionAndVision />
      {
        //<OurNews news={news} />
      }
      <OurServices services={services} />
      <ContactForm companyInfo={companyInfo} />
      <OurTeam employees={employees} />
      <HowToFindUs companyInfo={companyInfo} />
      <MapWithNoSSR coords={companyInfo?.coords.split(",")} link={companyInfo?.address_url} title={companyInfo?.title} />
    </Container >
  )
}

export default Home