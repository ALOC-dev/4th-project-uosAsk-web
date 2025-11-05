import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { MainLayoutWrapper } from '@/components/layout/main-layout-wrapper';

const notoSansKR = Noto_Sans_KR({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: '시립대 누가 공지해주나?',
  description: '서울시립대 학생을 위한 통합 공지사항 서비스',
  metadataBase: new URL('https://uosask.example.com'),
  openGraph: {
    title: '시립대 누가 공지해주나?',
    description: '서울시립대 학생을 위한 통합 공지사항 서비스',
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
    <html lang='ko' className={notoSansKR.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('uosask-theme') || 'day';
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${notoSansKR.className} antialiased`}>
        <ThemeProvider>
          <MainLayoutWrapper>{children}</MainLayoutWrapper>
        </ThemeProvider>
        <div id='modal' />
      </body>
    </html>
  );
}
