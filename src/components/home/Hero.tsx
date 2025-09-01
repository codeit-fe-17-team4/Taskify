// SPEC: Hero 컴포넌트 - 이전 채팅 로그 기반
// desktop.svg: 722×422.76 (PC), 537.25×314.76 (태블릿)
// 제목: "새로운 일정 관리 Taskify" (한 줄)
// 컨테이너: max-w 1200px (PC), 664px (태블릿)
// 제목 컨테이너: 834px (PC), 626px (태블릿)
// 로그인 버튼: 280×54

import Image from 'next/image';
import type { ReactElement } from 'react';

export default function Hero(): ReactElement {
  return (
    <section className='mx-auto mt-[94px] max-w-[1200px] text-center max-[744px]:max-w-[664px] max-[375px]:mt-[42px] max-[375px]:max-w-full'>
      {/* desktop 이미지 */}
      <Image
        src='/auth/image/hero-desktop.svg'
        alt='메인 히어로 일러스트'
        width={722}
        height={422.76}
        className='mx-auto h-auto w-[722px] object-contain max-[744px]:h-auto max-[744px]:w-[537.25px] max-[375px]:h-[168px] max-[375px]:w-[287px]'
        sizes='(max-width: 48rem) 100vw, (max-width: 80rem) 664px, 722px'
        priority
      />

      {/* 제목 */}
      <h1 className='mx-auto mt-[48.24px] flex h-[100px] w-[834px] min-w-[834px] items-center justify-center gap-[28px] whitespace-nowrap max-[744px]:w-[626px] max-[744px]:min-w-[626px] max-[375px]:mt-[28px] max-[375px]:h-[105px] max-[375px]:w-[245px] max-[375px]:min-w-[245px] max-[375px]:flex-col max-[375px]:gap-0'>
        <span className='text-[76px] leading-[100px] font-bold tracking-[-0.02em] break-keep text-white max-[744px]:text-[56px] max-[744px]:leading-[74px] max-[375px]:text-[40px] max-[375px]:leading-[52px]'>
          새로운 일정 관리
        </span>
        <span className='text-[90px] leading-[65px] font-bold tracking-[-0.01em] break-keep text-[#5534da] max-[744px]:text-[66px] max-[744px]:leading-[48px] max-[375px]:text-[40px] max-[375px]:leading-[52px]'>
          Taskify
        </span>
      </h1>

      {/* 로그인하기 버튼 */}
      <a
        href='/login'
        className='mx-auto mt-[111px] inline-flex h-[54px] w-[280px] items-center justify-center rounded-[8px] bg-[#5534da] text-[18px] leading-[26px] font-[500] text-white hover:opacity-90 focus:ring-2 focus:ring-[#5534da] focus:ring-offset-2 focus:ring-offset-black focus:outline-none max-[744px]:mt-[111px] max-[375px]:mt-[101px] max-[375px]:h-[46px] max-[375px]:w-[235px]'
        aria-label='로그인 페이지로 이동'
      >
        로그인하기
      </a>
    </section>
  );
}
