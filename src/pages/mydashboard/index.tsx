import type { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ReactNode, useState } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import CreateNewboardModal from '@/components/mydashboard/create-newboard-modal';
import type { CreateNewboardFormData } from '@/components/mydashboard/type';
import { createDashBoard, getDashBoard } from '@/lib/dashboards/api';
import type { DashboardType, InvitationType } from '@/lib/dashboards/type';
import { acceptInvitation, getInvitationList } from '@/lib/invitations/api';
import {
  mydashboardInviteMockData,
  mydashboardMockData,
} from '@/lib/mydashboard-mock-data';
// 인증 상태를 받기 위한 props 타입 정의
interface MydashboardProps {
  /**
   * 서버에서 전달받은 로그인 상태
   */
  isLoggedIn: boolean;
}

interface DashboardList {
  id: number;
  title: string;
  dotcolor: string;
}

export default function Mydashboard({
  isLoggedIn,
}: MydashboardProps): ReactNode {
  // mock 데이터 파일 분리해서 활용 !
  const [dashboardData, setDashboardData] =
    useState<DashboardList[]>(mydashboardMockData);
  const [inviteData, setInviteDate] = useState<InvitationType[]>(
    mydashboardInviteMockData.invitations
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 페이지네이션 (라이브러리 x)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(dashboardData.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return dashboardData.slice(startIndex, endIndex);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  /**
   * 새로운 대시보드 생성 + 초대받은 대시보드 수락 시 목록에 추가되는 함수 (공통이라 빼 봄)
   */
  const addDashboardToList = (dashboard: {
    id: number;
    title: string;
    color: string;
  }) => {
    const newDashboardItem = {
      id: dashboard.id,
      title: dashboard.title,
      dotcolor: dashboard.color,
    };

    setDashboardData((prev) => [newDashboardItem, ...prev]);
  };

  // 새로운 대시보드 생성 api
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const handleCreateDashboard = async (formData: CreateNewboardFormData) => {
    if (isCreating) {
      return;
    }
    try {
      setIsCreating(true);
      // API 호출 - createDashBoard 컴포넌트 활용 ...
      const newDashboard = await createDashBoard(formData);

      // 공통 함수로 대시보드 추가!
      addDashboardToList(newDashboard);

      console.log('새 대시보드 생성 성공:', newDashboard);
      handleCloseModal();
      // id 가 number 타입인데 아래와 같이 사용하려니까 오류가 나서 해결 방법을 찾아보니 직접 타입을 명시해줘야 한다고 하여 toString으로 명시했습니다. 흠
      router.push(`/dashboard/${newDashboard.id.toString()}`);
    } catch (error) {
      console.error('대시보드 생성 실패:', error);
    } finally {
      setIsCreating(false);
    }
  };

  /**
   * 초대받은 대시보드 수락 api
   */
  const [isAcceptingInvitation, setIsAcceptingInvitation] = useState(false);

  const handleAcceptInvitation = async (inviteId: number) => {
    if (isAcceptingInvitation) {
      return;
    }

    try {
      setIsAcceptingInvitation(true);

      // 1. 초대 수락 API를 호출
      const invitation = await acceptInvitation(inviteId);

      // 2. 초대 받은 항목 가져오기
      const inviteDashboard = await getInvitationList(invitation.dashboard.id);

      // 3. 공통 함수로 대시보드 추가
      addDashboardToList(inviteDashboard);

      // 4. 초대 목록에서 수락한 초대를 제거
      setInviteDate((prev) => prev.filter((inv) => inv.id !== inviteId));

      console.log('초대 수락 및 대시보드 추가 성공:', inviteDashboard);
    } catch (error) {
      console.error('초대 수락 실패:', error);
    } finally {
      setIsAcceptingInvitation(false);
    }
  };

  /**
   * 거절 시 삭제 -> 초대 '거절'에 대한 api가 따로 없는 것 같아서 그냥 목록에서만 삭제했는데, 맞는지 확인 필요!
   */
  const handleRejectInvitation = (inviteId: number) => {
    setInviteDate((prev) => prev.filter((inv) => inv.id !== inviteId));
    console.log('초대 거절:', inviteId);
  };

  return (
    <>
      <div className='flex h-full min-h-screen w-full flex-col bg-gray-50'>
        {/* 새로운 대시보드 */}
        <div className='max-w-7xl p-6'>
          {dashboardData.length === 0 ? (
            <button
              className='tablet:w-3xs mobile:w-3xs flex h-[60px] w-2xs cursor-pointer items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-100'
              onClick={handleOpenModal}
            >
              <span className='text-sm font-bold text-gray-600'>
                새로운 대시보드
              </span>
              <Image
                src='/icon/newDashboard.svg'
                alt='새로운 대시보드'
                width={15}
                height={15}
              />
            </button>
          ) : (
            <div className='tablet:w-lg mobile:w-2xs mb-10 w-full max-w-4xl'>
              <div className='tablet:grid-cols-2 mobile:grid-cols-1 relative grid grid-cols-3 gap-2'>
                {/* 새로운 대시보드 (항상 첫 번째 위치에 고정되어 있어야 함!) */}
                <button
                  className='tablet:w-3xs mobile:w-2xs flex h-[60px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-100'
                  onClick={handleOpenModal}
                >
                  <span className='text-sm font-bold text-gray-600'>
                    새로운 대시보드
                  </span>
                  <Image
                    src='/icon/newDashboard.svg'
                    alt='새로운 대시보드'
                    width={20}
                    height={20}
                  />
                </button>

                {getCurrentPageData().map((dashboard) => {
                  return (
                    <Link
                      key={dashboard.id}
                      href={`/dashboard/${dashboard.id}`}
                    >
                      <button className='tablet:w-3xs mobile:w-2xs relative flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-md border border-gray-200 bg-white p-4 hover:bg-gray-100'>
                        <div
                          className={`h-2 w-2 rounded-full ${dashboard.dotcolor}`}
                        />
                        <span className='text-sm font-bold text-gray-600'>
                          {dashboard.title}
                        </span>
                      </button>
                    </Link>
                  );
                })}

                <div className='col-span-full mt-4 flex items-center justify-end gap-2'>
                  <p className='text-xs text-gray-600'>
                    {totalPages} 페이지 중 {currentPage}
                  </p>
                  <div className='flex'>
                    <button
                      className='flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-100 disabled:cursor-not-allowed'
                      disabled={currentPage === 1}
                      onClick={handlePrevPage}
                    >
                      <Image
                        src='/icon/prevPage.svg'
                        alt='이전 페이지'
                        width={7}
                        height={7}
                      />
                    </button>
                    <button
                      className='flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-100 disabled:cursor-not-allowed'
                      disabled={currentPage === totalPages}
                      onClick={handleNextPage}
                    >
                      <Image
                        src='/icon/nextPage.svg'
                        alt='다음 페이지'
                        width={7}
                        height={7}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 초대받은 대시보드 */}
          <div>
            {inviteData.length === 0 ? (
              // 초대받은 대시보드가 없을 때
              <div className='tablet:w-lg mobile:w-3xs mt-10 flex h-[280px] w-2xl flex-col rounded-lg border-0 bg-white'>
                <h2 className='pt-4 pl-[28px] text-lg font-bold text-gray-600 transition-colors hover:text-violet-500'>
                  초대받은 대시보드
                </h2>
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
            ) : (
              <>
                <div className='mt-10'>
                  <div className='tablet:w-lg mobile:w-2xs flex h-[650px] w-4xl flex-col rounded-lg border-0 bg-white'>
                    <h2 className='mobile:text-xl py-6 pl-[28px] text-2xl font-bold text-gray-700'>
                      초대받은 대시보드
                    </h2>
                    <div className='relative px-[28px]'>
                      <div className='pointer-events-none absolute inset-y-0 left-[28px] flex items-center pl-3'>
                        <Image
                          src='/icon/search.svg'
                          alt='검색'
                          width={20}
                          height={20}
                        />
                      </div>
                      <div>
                        <input
                          id='search'
                          type='text'
                          name='search'
                          placeholder='검색'
                          className='h-[40px] w-full rounded border border-gray-300 pr-4 pl-10 text-sm focus:ring-1 focus:ring-gray-300 focus:outline-none'
                        />
                        <ul></ul>
                      </div>
                    </div>

                    <div className='mobile:hidden tablet:grid-cols-[150px_80px_200px] tablet:pl-8 grid w-full max-w-2xl min-w-2xs grid-cols-[250px_250px_200px] gap-2 pt-5 pl-12 text-sm text-gray-400'>
                      <div>이름</div>
                      <div>초대자</div>
                      <div className='mobile:hidden text-center'>수락 여부</div>
                    </div>
                    <div className='flex-1 overflow-y-auto'>
                      {inviteData.map((invite) => {
                        return (
                          <div
                            key={invite.id}
                            className='mobile:flex mobile:flex-col mobile:w-full tablet:w-lg tablet:grid-cols-[150px_80px_200px] tablet:pl-8 grid grid-cols-[250px_250px_200px] items-center gap-2 border-b border-gray-200 py-5 pl-12 text-sm text-gray-600'
                          >
                            <div className='mobile:flex mobile:w-full'>
                              <p className='tablet:hidden mobile:w-16 mobile:block hidden text-gray-400'>
                                이름
                              </p>
                              <span className='mobile:ml-4'>
                                {invite.dashboard.title}
                              </span>
                            </div>
                            <div className='mobile:flex mobile:w-full'>
                              <p className='tablet:hidden mobile:w-16 mobile:block hidden text-gray-400'>
                                초대자
                              </p>
                              <span className='mobile:ml-4'>
                                {invite.inviter.nickname}
                              </span>
                            </div>
                            <div className='mobile:flex mobile:mt-2 mobile:w-full mobile:mr-8 flex items-center justify-center gap-2'>
                              <button
                                className='mobile:w-full w-20 cursor-pointer rounded bg-violet-500 py-1 text-sm text-white hover:bg-violet-600'
                                onClick={() => {
                                  handleAcceptInvitation(invite.id);
                                }}
                              >
                                수락
                              </button>
                              <button
                                className='mobile:w-full w-20 cursor-pointer rounded border border-gray-300 bg-white py-1 text-sm text-violet-500 hover:bg-gray-100'
                                onClick={() => {
                                  handleRejectInvitation(invite.id);
                                }}
                              >
                                거절
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <CreateNewboardModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateDashboard}
      />
    </>
  );
}
/**
 * 서버 사이드에서 실행되는 함수 - 페이지 렌더링 전에 로그인 상태 확인
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  // HttpOnly 쿠키에서 access_token 확인
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      isLoggedIn: true,
    },
  };
};

Mydashboard.getLayout = function getLayout(page: ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
