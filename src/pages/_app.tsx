import '@/styles/globals.css';
import '@/styles/landing.css'; // SPEC: 랜딩 페이지 전용 스타일 변수
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';

const pretendardVariable = localFont({
  src: '../../public/fonts/Pretendard/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '100 900',
});

export default function App({ Component, pageProps }: AppProps): ReactNode {
  return (
    <main className={pretendardVariable.variable}>
      <Component {...pageProps} />
    </main>
  );
}
