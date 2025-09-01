// SPEC: SettingsGrid 컴포넌트 - 채팅 로그 기반
// PC 1920 기준: 컨테이너 1200px
// Tablet 744px 기준: 컨테이너 664px
// 3개 카드: landing3.svg, landing4.svg, landing5.svg
// 그리드 간격: 24px
// 카드 크기: 378×260 (썸네일) + 124px (텍스트)
// 타이틀과 그리드 간격: 36px

import Image from 'next/image';
import type { ReactElement } from 'react';

interface Item {
  title: string;
  desc: string;
  img: string;
  alt: string;
  w: number;
  h: number;
}

const items: Item[] = [
  {
    title: '대시보드 설정',
    desc: '대시보드 사진과 이름을 변경할 수 있어요.',
    img: '/landing3.svg',
    alt: '대시보드 설정',
    w: 300,
    h: 123.87,
  },
  {
    title: '초대',
    desc: '새로운 팀원을 초대할 수 있어요.',
    img: '/landing4.svg',
    alt: '초대',
    w: 300,
    h: 230.81,
  },
  {
    title: '구성원',
    desc: '구성원을 초대하고 내보낼 수 있어요.',
    img: '/landing5.svg',
    alt: '구성원',
    w: 300,
    h: 195.48,
  },
];

export default function SettingsGrid(): ReactElement {
  return (
    <section className='mx-auto mt-[90px] w-[1200px] max-[744px]:w-[664px]'>
      <h3 className='text-[28px] leading-[33px] font-bold text-white max-[744px]:text-[24px] max-[744px]:leading-[28px]'>
        생산성을 높이는 다양한 설정 ⚡
      </h3>

      {/* 타이틀과 그리드 간격 36px */}
      <div className='mt-[36px] grid grid-cols-3 gap-6 max-[744px]:grid-cols-1 max-[744px]:gap-4'>
        {items.map((it) => {
          return (
            <article key={it.title} className='w-[378px] max-[744px]:w-full'>
              {/* 썸네일 영역 378×260 안에 실제 이미지 크기 중앙 배치 */}
              <div className='flex h-[260px] w-[378px] items-center justify-center overflow-hidden rounded-t-[8px] bg-[#4B4B4B] max-[744px]:w-full'>
                <Image
                  src={it.img}
                  alt={it.alt}
                  width={it.w}
                  height={it.h}
                  className='h-auto max-h-full w-auto max-w-full'
                />
              </div>
              <div className='h-[124px] w-[378px] rounded-b-[8px] bg-[#171717] px-8 py-6 max-[744px]:w-full'>
                <h4 className='mb-3 text-[18px] leading-[21px] font-bold text-white max-[744px]:text-[16px] max-[744px]:leading-[19px]'>
                  {it.title}
                </h4>
                <p className='text-[16px] leading-[19px] font-medium text-white max-[744px]:text-[14px] max-[744px]:leading-[17px]'>
                  {it.desc}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
