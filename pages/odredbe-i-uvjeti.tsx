import { Container } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import SEO from '../app/components/common/SEO/SEO';
import useWindowSize from '../app/utility/windowSize';
import prisma from '../app/utility/prisma';

export const getStaticProps: GetStaticProps = async () => {
  //const employes = await prisma.employes.findMany();
  //const companyInfo = await prisma.company_info.findFirst();
  const page_info = await prisma.page_info.findFirst(
    {
      where: {
        page_slug: {
            contains: "/odredbe-i-uvjeti"
        }
      }
    }
  );

  return { props: {  page_info } };
};

const OdredbeIUvjeti = ({ page_info }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { width } = useWindowSize();

  return (
    <Container maxWidth={false} sx={{ pt: "16px", pb: "16px", p: width > 600 ? "0 !important" : undefined }}>
      {<SEO page_info={page_info} />
      }
    </Container >
  )
}

export default OdredbeIUvjeti