// SPEC: FeatureOne 컴포넌트 - 이전 채팅 로그 기반
// PC 1920 기준: 컨테이너 1200×600, 상단 마진 180px
// Tablet 744px 기준: 컨테이너 664×972, 상단 마진 120px
// 배경색: #171717
// landing1.svg 이미지
// 제목: "일의 우선순위를 관리하세요" (2줄)
// Point 1과 제목 간격: 100px
// 텍스트 컨테이너: bottom-[223px], left-[60px]

import Image from 'next/image';
import type { ReactElement } from 'react';

export default function FeatureOne(): ReactElement {
  return (
    <section className='relative mx-auto mt-[180px] h-[600px] w-full max-w-[1200px] bg-[#171717] max-[744px]:mx-[40px] max-[744px]:mt-[180px] max-[744px]:h-[972px] max-[744px]:max-w-[664px] max-[744px]:pb-[220px] max-[375px]:mt-[76px] max-[375px]:h-[686px] max-[375px]:w-[343px] max-[375px]:pb-[194px]'>
      {/* 배경 이미지 */}
      <Image
        src='/auth/image/landing1.svg'
        alt='일의 우선순위 관리 일러스트'
        width={594}
        height={497.49}
        className='absolute right-0 bottom-0 h-auto w-[594px] object-contain max-[744px]:h-[435px] max-[744px]:w-[519.39px] max-[375px]:h-[248px] max-[375px]:w-[296.11px]'
      />

      {/* 텍스트 컨테이너 */}
      <div className='absolute bottom-[223px] left-[60px] w-[302px] max-[744px]:top-[63px] max-[744px]:left-[60px] max-[744px]:w-[250px] max-[375px]:top-[60px] max-[375px]:left-1/2 max-[375px]:-translate-x-1/2 max-[375px]:text-center'>
        <p className='mb-[100px] text-[22px] leading-[26px] font-medium text-white max-[744px]:text-[18px] max-[744px]:leading-[22px] max-[375px]:mb-[61px]'>
          Point 1
        </p>
        <h2 className='w-[302px] text-[48px] leading-[64px] font-bold text-white max-[744px]:w-[250px] max-[744px]:text-[36px] max-[744px]:leading-[48px]'>
          <span className='block whitespace-nowrap'>일의 우선순위를</span>
          <span className='block whitespace-nowrap'>관리하세요</span>
        </h2>
      </div>
    </section>
  );
}
