import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';

export const metadata: Metadata = {
  title: 'uosAsk',
  description: '서울시립대 학생을 위한 학습 커뮤니티',
  metadataBase: new URL('https://uosask.example.com'),
  openGraph: {
    title: 'uosAsk',
    description: '서울시립대 학생을 위한 학습 커뮤니티',
    type: 'website',
    locale: 'ko_KR',
  },
  alternates: { canonical: '/' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className='antialiased'>
        <ThemeProvider>{children}</ThemeProvider>
        <div id='modal' />
      </body>
    </html>
  );
}
