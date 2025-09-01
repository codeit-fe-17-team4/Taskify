// SPEC: 랜딩 페이지 복구 - 이전 채팅 로그 기반
// PC 1920×1080 기준, 태블릿 744px 브레이크포인트
// Header: 높이 70px, 태블릿 패딩 80px→40px
// Hero: desktop.svg 722×422.76, 제목 한 줄, 컨테이너 max-w 1200px/664px
// FeatureOne: landing1.svg, 제목 2줄, Point 1 간격 100px
// FeatureTwo: landing2.svg, 제목 2줄, Point 2 간격 100px
// SettingsGrid: 3개 카드, 그리드 간격 24px
// Footer: 소셜 아이콘, 네비게이션
// 최소 좌우 여백 12px, 검은색 배경 전폭 채움
// Footer 상단 간격: 160px

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
      <Header />
      <main className='flex flex-col items-center'>
        <Hero />
        <FeatureOne />
        <FeatureTwo />
        <SettingsGrid />
      </main>
      {/* Footer 상단 간격 160px */}
      <div className='mt-[160px]'>
        <Footer />
      </div>
    </div>
  );
}
