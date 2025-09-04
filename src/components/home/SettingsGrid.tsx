// 랜딩페이지 설정 카드 그리드 컴포넌트 (생산성 기능 소개)
import Image from 'next/image';
import type { ReactElement } from 'react';

interface Item {
  title: string;
  desc: string;
  img: string;
  alt: string;
  w: number;
  h: number;
  mobileW: number;
  mobileH: number;
}

const items: Item[] = [
  {
    title: '대시보드 설정',
    desc: '대시보드 사진과 이름을 변경할 수 있어요.',
    img: '/auth/image/landing3.svg',
    alt: '대시보드 설정',
    w: 300,
    h: 123.87,
    mobileW: 260,
    mobileH: 107.35,
  },
  {
    title: '초대',
    desc: '새로운 팀원을 초대할 수 있어요.',
    img: '/auth/image/landing4.svg',
    alt: '초대',
    w: 300,
    h: 230.81,
    mobileW: 260,
    mobileH: 200.03,
  },
  {
    title: '구성원',
    desc: '구성원을 초대하고 내보낼 수 있어요.',
    img: '/auth/image/landing5.svg',
    alt: '구성원',
    w: 300,
    h: 195.48,
    mobileW: 260,
    mobileH: 169.42,
  },
];

export default function SettingsGrid(): ReactElement {
  return (
    <section className='mx-auto mt-[90px] w-[1200px] max-[744px]:w-[664px] max-[375px]:mt-[90px] max-[375px]:w-[343px]'>
      <h3 className='text-[28px] leading-[33px] font-bold text-white max-[744px]:flex max-[744px]:h-[33px] max-[744px]:items-center max-[744px]:justify-center max-[744px]:text-center max-[744px]:text-[24px] max-[744px]:leading-[28px] max-[375px]:mx-auto max-[375px]:h-[26px] max-[375px]:w-[343px] max-[375px]:text-center max-[375px]:text-[22px] max-[375px]:leading-[26px] max-[375px]:font-bold max-[375px]:tracking-[0px] max-[375px]:whitespace-nowrap'>
        생산성을 높이는 다양한 설정 ⚡
      </h3>

      {/* 타이틀과 그리드 간격 36px */}
      <div className='mt-[36px] grid grid-cols-3 gap-6 max-[744px]:grid-cols-1 max-[744px]:justify-items-center max-[744px]:gap-[48px] max-[375px]:mt-[42px] max-[375px]:gap-[40.48px]'>
        {items.map((it) => {
          return (
            <article
              key={it.title}
              className='w-[378px] max-[744px]:w-[378px] max-[375px]:w-[343px]'
            >
              {/* 썸네일 영역 378×260 안에 실제 이미지 크기 중앙 배치 */}
              <div className='flex h-[260px] w-[378px] items-center justify-center overflow-hidden rounded-t-[8px] bg-[#4B4B4B] max-[744px]:w-[378px] max-[375px]:h-[235.93px] max-[375px]:w-[343px]'>
                <Image
                  src={it.img}
                  alt={it.alt}
                  width={it.w}
                  height={it.h}
                  className={(() => {
                    let mobileClass = '';

                    switch (it.img) {
                      case '/auth/image/landing3.svg': {
                        mobileClass =
                          'max-[375px]:h-[107.35px] max-[375px]:w-[260px]';
                        break;
                      }
                      case '/auth/image/landing4.svg': {
                        mobileClass =
                          'max-[375px]:h-[200.03px] max-[375px]:w-[260px]';
                        break;
                      }
                      case '/auth/image/landing5.svg': {
                        mobileClass =
                          'max-[375px]:h-[169.42px] max-[375px]:w-[260px]';
                        break;
                      }
                      default: {
                        break;
                      }
                    }

                    return `h-auto max-h-full w-auto max-w-full ${mobileClass}`;
                  })()}
                />
              </div>
              <div className='h-[124px] w-[378px] rounded-b-[8px] bg-[#171717] px-8 py-6 max-[744px]:w-[378px] max-[375px]:h-[112.52px] max-[375px]:w-[343px]'>
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
