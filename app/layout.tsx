import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UidContextProvider } from '@/src/user/context';
import { Header } from '@/src/header.tsx/header';
import { LoadingProvider } from '@/src/loading/suspense';
import { ErrorContextProvider } from '@/src/error/context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <UidContextProvider>
          <ErrorContextProvider>
            <Header></Header>
            <LoadingProvider>{children}</LoadingProvider>
          </ErrorContextProvider>
        </UidContextProvider>
        <footer>Test footer</footer>
      </body>
    </html>
  );
}
