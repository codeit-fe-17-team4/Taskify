// 랜딩페이지 상단 헤더 컴포넌트 (로고 + 네비게이션)
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement, useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeIcon } from '@/utils/getThemeIcon';

export default function Header(): ReactElement {
  const [isAuth, setIsAuth] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
    <header className='flex h-[70px] w-full items-center justify-between bg-[var(--c-bg)] px-[80px] max-[744px]:px-[40px] max-[375px]:h-[60px] max-[375px]:px-[24px] max-[375px]:py-[16px] min-[745px]:px-[80px]'>
      {/* 로고 */}
      <div className='flex items-center'>
        <Image
          src={getThemeIcon('logo-header', theme)}
          alt='Taskify 로고'
          width={121}
          height={39}
          className='h-[39px] w-[121px] max-[375px]:h-[27px] max-[375px]:w-auto'
        />
      </div>

      {/* 네비게이션 */}
      <nav className='flex items-center gap-6'>
        {/* 테마 토글 버튼 */}
        <button
          className='flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--auth-primary)] text-white transition-colors duration-200 hover:bg-[var(--button-primary-hover)] focus:outline-none max-[375px]:h-8 max-[375px]:w-8'
          aria-label={
            theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'
          }
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            // 달 아이콘 (다크 모드로 전환)
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
            </svg>
          ) : (
            // 태양 아이콘 (라이트 모드로 전환)
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <circle cx='12' cy='12' r='5' />
              <line x1='12' y1='1' x2='12' y2='3' />
              <line x1='12' y1='21' x2='12' y2='23' />
              <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
              <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
              <line x1='1' y1='12' x2='3' y2='12' />
              <line x1='21' y1='12' x2='23' y2='12' />
              <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
              <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
            </svg>
          )}
        </button>

        <Link
          href={isAuth ? '/mydashboard' : '/login'}
          className='text-[16px] leading-[26px] text-[var(--c-fg)] hover:opacity-80 focus:outline-none max-[375px]:text-[14px]'
          aria-label='로그인 페이지로 이동'
        >
          로그인
        </Link>
        <Link
          href={isAuth ? '/mydashboard' : '/signup'}
          className='text-[16px] leading-[26px] text-[var(--c-fg)] hover:opacity-80 focus:outline-none max-[375px]:text-[14px]'
          aria-label='회원가입 페이지로 이동'
        >
          회원가입
        </Link>
      </nav>
    </header>
  );
}
