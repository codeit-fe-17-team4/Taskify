import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/auth-variables.module.css';

export default function LandingPage() {
  const router = useRouter();

  // API 기능은 나중에 구현 예정
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const user = await me();
  //       if (user.dashboards && user.dashboards.length > 0) {
  //         router.push(`/dashboard/${user.dashboards[0].id}`);
  //       }
  //     } catch (error) {
  //       // 로그인되지 않은 상태, 랜딩 페이지 유지
  //     }
  //   };
  //   checkAuth();
  // }, [router]);

  return (
    <main
      className={`${styles.auth} ${styles.bgAuth} flex min-h-screen min-w-[375px] items-center justify-center overflow-x-auto px-3 max-[1279px]:px-6`}
    >
      <div className='mx-auto flex h-[653px] w-[520px] shrink-0 flex-col items-center gap-[30px] max-[1279px]:h-[635px] max-[1279px]:w-full max-[1279px]:max-w-[520px]'>
        {/* Hero Block */}
        <div className='flex h-[322px] w-[200px] flex-col items-center gap-[10px]'>
          <div className='flex h-[280px] w-[200px] flex-col items-center gap-[30px] max-[1279px]:h-[280px]'>
            <div className='relative h-[280px] w-[200px] overflow-hidden'>
              <Link href='/' className='block h-full w-full'>
                <Image
                  src='/logo-auth.svg'
                  alt='Taskify Logo'
                  fill
                  className='object-cover object-center'
                  priority
                />
              </Link>
            </div>
          </div>
          <p
            className={`${styles.textStrong} mx-auto mt-[12px] w-[200px] max-w-[200px] overflow-hidden whitespace-nowrap text-center text-[20px] font-[500] leading-[32px] tracking-[-0.01em] max-[1279px]:mt-[10px]`}
          >
            오늘도 만나서 반가워요!
          </p>
        </div>

        {/* Action Buttons */}
        <div className='flex w-[520px] flex-col items-center gap-[24px]'>
          <Link
            href='/login'
            className='flex h-[50px] w-[520px] items-center justify-center rounded-[8px] bg-[var(--auth-primary)] text-center text-[18px] font-[500] leading-[26px] text-white transition-opacity hover:opacity-90'
          >
            로그인
          </Link>
          <Link
            href='/signup'
            className='flex h-[50px] w-[520px] items-center justify-center rounded-[8px] border border-[var(--auth-border)] text-center text-[18px] font-[500] leading-[26px] text-[var(--auth-text-strong)] transition-colors hover:bg-gray-50'
          >
            회원가입
          </Link>
        </div>
      </div>
    </main>
  );
}
