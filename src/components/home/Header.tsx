// 랜딩페이지 상단 헤더 컴포넌트 (로고 + 네비게이션)
import Image from 'next/image';
import { type ReactElement, useEffect, useState } from 'react';

export default function Header(): ReactElement {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const res = await fetch('/api/me');

        if (mounted) {
          setIsAuth(res.ok);
        }
      } catch {
        if (mounted) {
          setIsAuth(false);
        }
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

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
          href={isAuth ? '/mydashboard' : '/login'}
          className='text-[16px] leading-[26px] text-white hover:opacity-80 focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-black focus:outline-none max-[375px]:text-[14px]'
          aria-label='로그인 페이지로 이동'
        >
          로그인
        </a>
        <a
          href={isAuth ? '/mydashboard' : '/signup'}
          className='text-[16px] leading-[26px] text-white hover:opacity-80 focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-black focus:outline-none max-[375px]:text-[14px]'
          aria-label='회원가입 페이지로 이동'
        >
          회원가입
        </a>
      </nav>
    </header>
  );
}
