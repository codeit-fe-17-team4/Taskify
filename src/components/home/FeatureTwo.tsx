// 랜딩페이지 두 번째 기능 소개 컴포넌트
import Image from 'next/image';
import type { ReactElement } from 'react';

export default function FeatureTwo(): ReactElement {
  return (
    <section className='relative mx-auto mt-[90px] h-[600px] w-full max-w-[1200px] bg-[var(--c-ink-strong)] max-[744px]:mx-4 max-[744px]:mt-[90px] max-[744px]:h-[972px] max-[744px]:max-w-[664px] max-[744px]:pb-[240px] max-[375px]:mt-[59px] max-[375px]:h-[686px] max-[375px]:w-[343px]'>
      {/* 배경 이미지 */}
      <Image
        src='/auth/image/landing2.svg'
        alt='할 일 등록 일러스트'
        width={436}
        height={502}
        className='absolute bottom-0 left-[108px] h-auto w-[436px] object-contain max-[744px]:bottom-0 max-[744px]:left-1/2 max-[744px]:h-[415px] max-[744px]:w-[360.44px] max-[744px]:-translate-x-1/2 max-[375px]:h-[250px] max-[375px]:w-[217.13px]'
        loading='lazy'
      />

      {/* 텍스트 컨테이너 */}
      <div className='absolute bottom-[223px] left-[644px] w-[230px] max-[744px]:top-[63px] max-[744px]:left-[60px] max-[744px]:w-[200px] max-[375px]:top-[60px] max-[375px]:left-1/2 max-[375px]:-translate-x-1/2 max-[375px]:text-center'>
        <p className='mb-[100px] text-[22px] leading-[26px] font-medium text-[var(--c-ink-tertiary)] max-[744px]:text-[18px] max-[744px]:leading-[22px] max-[375px]:mb-[61px]'>
          Point 2
        </p>
        <h2 className='w-[230px] text-[48px] leading-[64px] font-bold text-[var(--main-text)] max-[744px]:w-[200px] max-[744px]:text-[36px] max-[744px]:leading-[48px]'>
          <span className='block whitespace-nowrap'>해야 할 일을</span>
          <span className='block whitespace-nowrap'>등록하세요</span>
        </h2>
      </div>
    </section>
  );
}
