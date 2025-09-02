import type { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ReactNode, useState } from 'react';
import UnifiedModal from '@/components/auth/UnifiedModal';
import DashboardLayout from '@/components/layout/dashboard-layout';

// 인증 상태를 받기 위한 props 타입 정의
interface MydashboardProps {
  /**
   * 서버에서 전달받은 로그인 상태
   */
  isLoggedIn: boolean;
}

export default function Mydashboard({
  isLoggedIn,
}: MydashboardProps): ReactNode {
  const router = useRouter();

  // 로그인하지 않은 상태라면 모달을 표시하도록 초기값 설정
  const [showLoginModal, setShowLoginModal] = useState(!isLoggedIn);

  /**
   * 로그인 모달을 닫고 로그인 페이지로 리다이렉트하는 함수
   */
  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    // 로그인 성공 후 원래 페이지로 돌아올 수 있도록 next 파라미터 추가
    router.push('/login?next=/mydashboard');
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* BG global 생성되면 수정 예정 */}
      {/* 새로운 대시보드 */}
      <div className='max-w-7xl p-6'>
        <Link href='../components/mydashboard/invite-list.tsx'>
          <button className='flex h-11 w-full cursor-pointer items-center justify-center gap-1 rounded border border-gray-200 bg-white sm:w-2xs md:w-40 lg:w-md xl:w-3xs'>
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
        <div className='mt-10 flex h-[280px] w-full max-w-4xl flex-col rounded-lg border-0 bg-white sm:w-2xs md:w-sm lg:w-md xl:w-3xl'>
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

      {/* 로그인하지 않은 사용자에게 표시되는 모달 */}
      <UnifiedModal
        isOpen={showLoginModal}
        message='로그인을 해야합니다'
        type='error'
        onClose={handleLoginModalClose}
      />
    </div>
  );
}

/**
 * 서버 사이드에서 실행되는 함수 - 페이지 렌더링 전에 로그인 상태 확인
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  // HttpOnly 쿠키에서 access_token 확인
  const accessToken = req.cookies.access_token;
  /**
   * 토큰이 있으면 로그인 상태, 없으면 비로그인 상태
   */
  const isLoggedIn = Boolean(accessToken);

  // 클라이언트 컴포넌트에 로그인 상태를 props로 전달
  return {
    props: {
      isLoggedIn,
    },
  };
};

Mydashboard.getLayout = function getLayout(page: ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
