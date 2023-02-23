import { Box, Container } from '@mui/material';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import SEO from '../app/components/common/SEO/SEO';
import useWindowSize from '../app/utility/windowSize';
import prisma from '../app/utility/prisma';
import Title from '../app/components/common/title/title';

export const getStaticProps: GetStaticProps = async () => {
  //const employees = await prisma.employees.findMany();
  //const companyInfo = await prisma.company_info.findFirst();
  const page_info = await prisma.page_info.findFirst(
    {
      where: {
        page_slug: {
            contains: "/politika-privatnosti"
        }
      }
    }
  );

  return { props: {  page_info } };
};

const PolitikaPrivatnosti = ({ page_info }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { width } = useWindowSize();

  return (
    <Container maxWidth={false} sx={{ pt: "16px", pb: "16px", p: width > 600 ? "0 !important" : undefined }}>
      {<SEO page_info={page_info} />
      }
      <Box sx={{ py: "32px" }}>
        <Title title={page_info?.title} />
        <Box>
            
        </Box>
      </Box>
    </Container >
  )
}

export default PolitikaPrivatnosti