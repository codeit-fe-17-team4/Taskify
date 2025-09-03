import Image from 'next/image';
import { useRouter } from 'next/router';
import { type ReactNode, useCallback } from 'react';

interface BackButtonProps {
  /** 클릭 시 이동할 경로 (기본값: 이전 페이지) */
  href?: string;
  /** 추가 CSS 클래스 */
  className?: string;
}

export default function BackButton({
  href,
  className = '',
}: BackButtonProps): ReactNode {
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  }, [href, router]);

  return (
    <button
      type='button'
      className={`flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80 ${className}`}
      style={{
        width: '84px',
        height: '26px',
      }}
      onClick={handleClick}
    >
      <Image src='/icon/goback.svg' alt='go-back' width={10} height={10} />
      <span
        style={{
          color: '#333236',
          fontFamily: 'Pretendard',
          fontWeight: 500,
          fontSize: '16px',
        }}
      >
        돌아가기
      </span>
    </button>
  );
}
