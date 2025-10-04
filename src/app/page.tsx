import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('@/components/home-page'), {
  ssr: true,
});

export default function Home() {
  return <HomePage />;
}
