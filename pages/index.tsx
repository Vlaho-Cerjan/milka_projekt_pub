import { Container } from '@mui/material';
import SEO from '../app/components/common/SEO/SEO';
import useWindowSize from '../app/utility/windowSize';
import Greeting from '../app/components/home/greeting';
import OurServices from '../app/components/home/ourServices';
import OurTeam from '../app/components/home/ourTeam';
//import OurNews from '../app/components/home/ourNews';
import MissionAndVision from '../app/components/home/missionAndVision';
import ContactForm from '../app/components/home/contactForm';
import dynamic from 'next/dynamic';
import HowToFindUs from '../app/components/home/howToFindUs';
import React from 'react';
import { blog, employees, page_info, services } from '@prisma/client';

const MapWithNoSSR = dynamic(() => import('../app/components/map/map'), {
  ssr: false,
});

const Home = () => {
  const { width } = useWindowSize();
  const [services, setServices] = React.useState<services[]>([]);
  const [news, setNews] = React.useState<blog[]>([]);
  const [employees, setEmployees] = React.useState<employees[]>([]);
  const [companyInfo, setCompanyInfo] = React.useState<any>(null);
  const [page_info, setPageInfo] = React.useState<page_info | null>(null);

  React.useEffect(() => {
    // fetch all the data
    fetch(process.env.NEXT_PUBLIC_API_URL + "homepage")
      .then(res => res.json())
      .then(data => {
        setServices(data.services);
        setNews(data.news);
        setEmployees(data.employees);
        setCompanyInfo(data.companyInfo);
        setPageInfo(data.page_info);
      })
      .catch(err => console.log(err));

    return () => {
      setServices([]);
      setNews([]);
      setEmployees([]);
      setCompanyInfo(null);
      setPageInfo(null);
    }
  }, [])

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
      {typeof companyInfo !== "undefined" && companyInfo !== null ?
      <ContactForm companyInfo={companyInfo} />
      : null}
      <OurTeam employees={employees} />
      {typeof companyInfo !== "undefined" && companyInfo !== null ?
      <HowToFindUs companyInfo={companyInfo} />
      : null}
      {typeof companyInfo !== "undefined" && companyInfo !== null && companyInfo.coords !== null ?
      <MapWithNoSSR coords={companyInfo.coords.split(",")} link={companyInfo.address_url} title={companyInfo.title} />
      : null}
    </Container >
  )
}

export default Home