import '@/styles/globals.css';
import '@/styles/landing.css'; // SPEC: 랜딩 페이지 전용 스타일 변수
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';

const pretendardVariable = localFont({
  src: '../../public/fonts/Pretendard/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '100 900',
});
const montserrat = Montserrat({ variable: '--font-montserrat' });

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}): ReactNode {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return getLayout(
    <main
      className={`${pretendardVariable.variable} font-pretendard ${montserrat.variable}`}
    >
      <Component {...pageProps} />
    </main>
  );
}
