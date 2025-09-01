// 랜딩페이지 상단 헤더 컴포넌트 (로고 + 네비게이션)
import Image from 'next/image';
import type { ReactElement } from 'react';

export default function Header(): ReactElement {
  return (
    <header className='flex h-[70px] w-full items-center justify-between bg-black px-[80px] max-[744px]:px-[40px] max-[375px]:h-[60px] max-[375px]:px-[24px] max-[375px]:py-[16px] min-[745px]:px-[80px]'>
      {/* 로고 */}
      <div className='flex items-center'>
        <Image
          src='/auth/image/logo-header.svg'
          alt='Taskify 로고'
          width={121}
          height={39}
          className='h-[39px] w-[121px] max-[375px]:h-[27px] max-[375px]:w-auto'
        />
      </div>

      {/* 네비게이션 */}
      <nav className='flex items-center gap-6'>
        <a
          href='/login'
          className='text-[16px] leading-[26px] text-white hover:opacity-80 focus:ring-2 focus:ring-[#5534da] focus:ring-offset-2 focus:ring-offset-black focus:outline-none max-[375px]:text-[14px]'
        >
          로그인
        </a>
        <a
          href='/signup'
          className='text-[16px] leading-[26px] text-white hover:opacity-80 focus:ring-2 focus:ring-[#5534da] focus:ring-offset-2 focus:ring-offset-black focus:outline-none max-[375px]:text-[14px]'
        >
          회원가입
        </a>
      </nav>
    </header>
  );
}
