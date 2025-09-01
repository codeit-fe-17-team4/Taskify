// SPEC: Footer 컴포넌트 - 픽셀 매칭 복구
// 높이: 100px
// 배경: 검정색 (#000000)
// 패딩: Header와 동일 (PC 80px, Tablet 40px)
// 정렬: Header와 동일 (justify-between)
// 마진: 제거하고 패딩만 사용
// 3열 그리드: 좌측 @codeit - 2023 / 중앙 Privacy Policy · FAQ / 우측 아이콘
// 텍스트 색: #9FA6B2 (토큰 기반)
// 불필요한 HR/보더/중앙 정렬 제거

import type { ReactElement } from 'react';

export default function Footer(): ReactElement {
  return (
    <footer className='bg-inverse text-on-inverse w-full'>
      {/* 컨테이너: Header와 동일한 패딩, 세로 중앙 */}
      <div className='flex min-h-[100px] items-center justify-between px-[80px] max-[744px]:px-[40px] max-[375px]:flex-col max-[375px]:justify-center max-[375px]:gap-3 max-[375px]:py-6 min-[745px]:px-[80px]'>
        {/* 좌측: © 텍스트 (시안은 '@codeit - 2023') */}
        <p
          className='text-muted-on-inverse text-[16px] leading-[100%] font-normal max-[375px]:order-1 max-[375px]:text-[12px]'
          aria-label='copyright'
        >
          @codeit - 2023
        </p>

        {/* 중앙: 링크 2개 (Privacy Policy, FAQ) */}
        <nav
          className='flex items-center gap-8 max-[375px]:order-2 max-[375px]:gap-4'
          aria-label='footer-nav'
        >
          <a
            href='/privacy'
            className='text-muted-on-inverse text-[16px] leading-[100%] font-normal whitespace-nowrap underline-offset-2 hover:underline focus:underline focus:outline-none max-[375px]:text-[12px]'
          >
            Privacy Policy
          </a>
          <a
            href='/faq'
            className='text-muted-on-inverse text-[16px] leading-[100%] font-normal whitespace-nowrap underline-offset-2 hover:underline focus:underline focus:outline-none max-[375px]:text-[12px]'
          >
            FAQ
          </a>
        </nav>

        {/* 우측: 아이콘 3개 (메일, Facebook, Instagram) */}
        <div className='flex items-center gap-4 max-[375px]:order-3'>
          {/* 메일 아이콘 */}
          <a
            aria-label='email'
            href='mailto:contact@taskify.app'
            className='text-on-inverse'
          >
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='currentColor'
              aria-hidden='true'
            >
              <path d='M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z' />
            </svg>
          </a>
          {/* Facebook 아이콘 */}
          <a
            aria-label='facebook'
            href='https://www.facebook.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-on-inverse'
          >
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              aria-hidden='true'
            >
              <rect x='3' y='3' width='18' height='18' rx='3' fill='white' />
              <path
                d='M13 22V12h3l1-4h-4V6c0-1.103.897-2 2-2h2V0h-2a6 6 0 0 0-6 6v2H7v4h3v10h3Z'
                fill='black'
              />
            </svg>
          </a>
          {/* Instagram 아이콘 */}
          <a
            aria-label='instagram'
            href='https://www.instagram.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-on-inverse'
          >
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              aria-hidden='true'
            >
              <rect x='3' y='3' width='18' height='18' rx='5' strokeWidth='2' />
              <circle cx='12' cy='12' r='4' strokeWidth='2' />
              <circle cx='17.5' cy='6.5' r='1.5' fill='currentColor' />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
