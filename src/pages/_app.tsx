import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';

const pretendardVariable = localFont({
  src: '../../public/fonts/Pretendard/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '100 900',
});
const montserrat = Montserrat({ variable: '--font-montserrat' });

export default function App({ Component, pageProps }: AppProps): ReactNode {
  return (
    <main
      className={`${pretendardVariable.variable} ${montserrat.variable} font-pretendard`}
    >
      <Component {...pageProps} />
    </main>
  );
}
