// SPEC: FeatureTwo 컴포넌트 - 이전 채팅 로그 기반
// PC 1920 기준: 컨테이너 1200×600, 상단 마진 90px
// Tablet 744px 기준: 컨테이너 664×972, 상단 마진 120px
// 배경색: #171717
// landing2.svg 이미지
// 제목: "해야 할 일을 등록하세요" (2줄)
// Point 2와 제목 간격: 100px
// 텍스트 컨테이너: bottom-[223px], left-[644px]
// 이미지 위치: left-[108px], bottom-[0px], width-[436px], height-[502px]

import Image from 'next/image';
import type { ReactElement } from 'react';

export default function FeatureTwo(): ReactElement {
  return (
    <section className='relative mx-auto mt-[90px] h-[600px] w-full max-w-[1200px] bg-[#171717] max-[744px]:mt-[120px] max-[744px]:h-[972px] max-[744px]:max-w-[664px]'>
      {/* 배경 이미지 */}
      <Image
        src='/landing2.svg'
        alt='할 일 등록 일러스트'
        width={436}
        height={502}
        className='absolute bottom-0 left-[108px] h-auto w-[436px] object-contain max-[744px]:left-[40px] max-[744px]:h-auto max-[744px]:w-[327px]'
      />

      {/* 텍스트 컨테이너 */}
      <div className='absolute bottom-[223px] left-[644px] w-[230px] max-[744px]:left-[40px] max-[744px]:w-[200px]'>
        <p className='mb-[100px] text-[22px] leading-[26px] text-[#9fa6b2] max-[744px]:text-[18px] max-[744px]:leading-[22px]'>
          Point 2
        </p>
        <h2 className='w-[230px] text-[48px] leading-[64px] font-bold text-white max-[744px]:w-[200px] max-[744px]:text-[36px] max-[744px]:leading-[48px]'>
          <span className='block whitespace-nowrap'>해야 할 일을</span>
          <span className='block whitespace-nowrap'>등록하세요</span>
        </h2>
      </div>
    </section>
  );
}
