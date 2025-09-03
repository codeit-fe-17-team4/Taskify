// 인증 페이지용 로고 + 제목 영역 컴포넌트
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/auth-variables.module.css';

interface AuthHeroProps {
  title: string;
}

export default function AuthHero({ title }: AuthHeroProps): React.JSX.Element {
  return (
    <div className='flex h-[322px] w-[200px] flex-col items-center gap-[10px]'>
      <div className='flex h-[280px] w-[200px] flex-col items-center gap-[30px]'>
        <div className='relative h-[280px] w-[200px]'>
          <Link href='/' className='block h-full w-full'>
            <Image
              fill
              priority
              src='/auth/image/login-signup-logo.svg'
              alt='Taskify Logo'
              className='object-contain object-center'
            />
          </Link>
        </div>
      </div>
      <p
        className={`${styles.textStrong} mx-auto mt-[12px] h-[32px] w-[200px] overflow-visible text-center text-[20px] leading-[32px] font-[500] tracking-[-0.01em] whitespace-nowrap max-[375px]:mt-[8px] max-[375px]:flex max-[375px]:h-[26px] max-[375px]:w-[170px] max-[375px]:items-center max-[375px]:justify-center max-[375px]:text-[18px]`}
      >
        {title}
      </p>
    </div>
  );
}
