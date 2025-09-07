import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';
import FeatureOne from '@/components/home/FeatureOne';
import FeatureTwo from '@/components/home/FeatureTwo';
import Footer from '@/components/home/Footer';
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import SettingsGrid from '@/components/home/SettingsGrid';

export default function LandingPage(): ReactElement {
  return (
    <div className='min-h-screen bg-black'>
      {/* 헤더 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <main className='flex flex-col items-center'>
        <Hero />
        <FeatureOne />
        <FeatureTwo />
        <SettingsGrid />
      </main>

      {/* 푸터 */}
      <div className='mt-[160px] max-[375px]:mt-[120.48px]'>
        <Footer />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: false, // 완전 정적 (재생성 안함)
  };
};
