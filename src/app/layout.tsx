import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import ThemeProvider from '@/components/providers/theme-provider';
import GlobalStyles from '@/components/global-styles';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <GlobalStyles />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
