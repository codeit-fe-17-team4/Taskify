import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import type { ReactNode } from 'react';
import UnifiedModal from '@/components/auth/UnifiedModal';

// 인증 상태를 받기 위한 props 타입 정의
interface MydashboardProps {
  isLoggedIn: boolean; // 서버에서 전달받은 로그인 상태
}

export default function Mydashboard({
  isLoggedIn,
}: MydashboardProps): ReactNode {
  const router = useRouter();

  // 로그인하지 않은 상태라면 모달을 표시하도록 초기값 설정
  const [showLoginModal, setShowLoginModal] = useState(!isLoggedIn);

  // 로그인 모달을 닫고 로그인 페이지로 리다이렉트하는 함수
  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    // 로그인 성공 후 원래 페이지로 돌아올 수 있도록 next 파라미터 추가
    router.push('/login?next=/mydashboard');
  };
  return (
    // 헤더, 사이드바 공간 필요
    <div className='min-h-screen bg-gray-50'>
      {/* BG global 생성되면 수정 예정 */}
      {/* 헤더 공간 */}
      <div className='pt-16'>
        {/* 사이드바 공간 */}
        <div className='ml-40'>
          {/* 새로운 대시보드 */}
          <div className='max-w-7xl p-6'>
            <Link href='../components/mydashboard/invite-list.tsx'>
              <button className='flex h-12 w-2xs cursor-pointer items-center justify-center gap-1 rounded border border-gray-200 bg-white'>
                <span className='text-xs font-bold text-gray-600'>
                  새로운 대시보드
                </span>
                <Image
                  src='/icon/newDashboard.svg'
                  alt='새로운 대시보드'
                  width={15}
                  height={15}
                />
              </button>
            </Link>
            {/* 초대받은 대시보드 */}
            <div className='mt-10 flex h-[280px] w-full max-w-4xl flex-col rounded-lg border-0 bg-white'>
              <h2 className='pt-4 pl-[28px] text-lg font-bold text-gray-600'>
                초대받은 대시보드
              </h2>
              {/* 빈 상태 표시 */}
              <div className='flex flex-grow flex-col items-center justify-center gap-2'>
                <Image
                  src='/icon/inviteEmpty.svg'
                  alt='초대받은 대시보드'
                  width={80}
                  height={80}
                />
                <p className='pt-5 text-xs text-gray-400'>
                  아직 초대받은 대시보드가 없어요
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 로그인하지 않은 사용자에게 표시되는 모달 */}
      <UnifiedModal
        isOpen={showLoginModal}
        onClose={handleLoginModalClose}
        message='로그인을 해야합니다'
        type='error'
      />
    </div>
  );
}

// 서버 사이드에서 실행되는 함수 - 페이지 렌더링 전에 로그인 상태 확인
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  // HttpOnly 쿠키에서 access_token 확인
  const accessToken = req.cookies.access_token;
  const isLoggedIn = !!accessToken; // 토큰이 있으면 로그인 상태, 없으면 비로그인 상태

  // 클라이언트 컴포넌트에 로그인 상태를 props로 전달
  return {
    props: {
      isLoggedIn,
    },
  };
};
