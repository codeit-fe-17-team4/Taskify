import FeatureOne from '@/components/home/FeatureOne';
import FeatureTwo from '@/components/home/FeatureTwo';
import Footer from '@/components/home/Footer';
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import SettingsGrid from '@/components/home/SettingsGrid';
import type { GetStaticProps } from 'next';
import type { ReactElement } from 'react';

export default function LandingPage(): ReactElement {
  return (
    <div className='min-h-screen bg-black'>
      <Header />
      <main className='flex flex-col items-center'>
        <Hero />
        <FeatureOne />
        <FeatureTwo />
        <SettingsGrid />
      </main>
      {/* Footer 상단 간격 160px */}
      <div className='mt-[160px] max-[375px]:mt-[120.48px]'>
        <Footer />
      </div>
    </div>
  );
}

/**
 * 정적 생성 설정.
 */
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: false, // 완전 정적 (재생성 안함)
  };
};
