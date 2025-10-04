import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>UoScholar</title>
        <meta
          name='description'
          content='서울시립대 학생을 위한 학습 커뮤니티'
        />
        <meta property='og:title' content='UoScholar' />
        <meta
          property='og:description'
          content='서울시립대 학생을 위한 학습 커뮤니티'
        />
        <meta property='og:type' content='website' />
        <meta property='og:locale' content='ko_KR' />
        <link rel='canonical' href='/' />
      </Head>
      <div>
        <h1>Home</h1>
      </div>
    </>
  );
};

export default Home;
