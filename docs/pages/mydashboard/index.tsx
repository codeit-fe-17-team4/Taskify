import type { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ReactNode, useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import CreateNewboardModal from '@/components/mydashboard/create-newboard-modal';
import type { CreateNewboardFormData } from '@/components/mydashboard/type';
import ModalPortal from '@/components/ui/modal/modal-portal';
import { useTheme } from '@/contexts/ThemeContext';
import { createDashBoard, getDashBoard } from '@/lib/dashboards/api';
import type { InvitationType } from '@/lib/dashboards/type';
import { acceptInvitation } from '@/lib/invitations/api';
import {
  mydashboardInviteMockData,
  mydashboardMockData,
} from '@/lib/mydashboard-mock-data';
import { getThemeIcon } from '@/utils/getThemeIcon';
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
  isOwner: boolean;
}

export default function Mydashboard({
  isLoggedIn,
}: MydashboardProps): ReactNode {
  const { theme } = useTheme();

  // 스타일 상수들
  const BUTTON_STYLES = {
    base: 'tablet:w-3xs mobile:w-2xs flex h-[60px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border hover:opacity-80',
    dark: 'border-[var(--auth-border)] bg-[var(--auth-input-bg)] hover:bg-[var(--auth-input-bg)]',
    light: 'border-gray-200 bg-white hover:bg-gray-100',
  };

  const TEXT_STYLES = {
    dark: 'text-[var(--auth-text-strong)]',
    light: 'text-gray-600',
  };

  const CONTAINER_STYLES = {
    dark: 'bg-[var(--auth-input-bg)]',
    light: 'bg-white',
  };

  const PLACEHOLDER_STYLES = {
    dark: 'text-[var(--auth-placeholder)]',
    light: 'text-gray-400',
  };

  const REJECT_BUTTON_STYLES = {
    dark: 'border-[var(--auth-border)] bg-[var(--auth-input-bg)] text-[var(--button-reject-text)] hover:bg-[var(--auth-input-bg)]',
    light: 'border-gray-300 bg-white text-violet-500 hover:bg-gray-100',
  };

  // mock 데이터 파일 분리해서 활용 !
  const [dashboardData, setDashboardData] =
    useState<DashboardList[]>(mydashboardMockData);

  const [inviteData, setInviteData] = useState<InvitationType[]>(
    mydashboardInviteMockData.invitations
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 검색 --> 확인 필요 ㅠㅠ 한글로 검색하면 초대받은 목록 없음 화면으로 렌더링 됨 ..
  useEffect(() => {
    if (searchQuery === '') {
      // 검색어 없으면 전체 보여주기
      setInviteData(mydashboardInviteMockData.invitations);
    } else {
      const query = searchQuery.toLowerCase();

      const filtered = mydashboardInviteMockData.invitations.filter(
        (invite) => {
          // title(대시보드 이름)에서만 검색 (요구사항 반영)
          return invite.dashboard.title.toLowerCase().includes(query);
        }
      );

      setInviteData(filtered);
    }
  }, [searchQuery]);

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
  const addDashboardToList = (
    dashboard: {
      id: number;
      title: string;
      color: string;
    },
    isOwner: boolean
  ) => {
    const newDashboardItem = {
      id: dashboard.id,
      title: dashboard.title,
      dotcolor: dashboard.color,
      isOwner,
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

      // 공통 함수로 대시보드 추가 , 내가 생성한 거니까 isOwner: true;
      addDashboardToList(newDashboard, true);

      console.log('새 대시보드 생성 성공:', newDashboard);
      handleCloseModal();
      // id 가 number 타입인데 아래와 같이 사용하려니까 오류가 나서 해결 방법을 찾아보니 직접 타입을 명시해줘야 한다고 하여 toString으로 명시했습니다. 흠
      // 생성 시 페이지 이동
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
      const invitation = await acceptInvitation({
        invitationId: inviteId,
        body: { inviteAccepted: true },
      });

      // 2. 초대 받은 대시보드 정보를 가져오기
      const dashboardDetails = await getDashBoard(invitation.dashboard.id);

      // 3. 공통 함수로 대시보드 추가 (초대받은 대시보드는 isOwner가 false)
      addDashboardToList(dashboardDetails, false);

      // 4. 초대 목록에서 수락한 초대를 제거
      setInviteData((prev) => prev.filter((inv) => inv.id !== inviteId));

      console.log('초대 수락 및 대시보드 추가 성공:', dashboardDetails);
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
    setInviteData((prev) => prev.filter((inv) => inv.id !== inviteId));
    console.log('초대 거절:', inviteId);
  };

  return (
    <>
      <div
        className={`flex h-full min-h-screen w-full flex-col ${
          theme === 'dark' ? 'bg-[var(--auth-bg)]' : 'bg-gray-50'
        }`}
      >
        {/* 새로운 대시보드 */}
        <div className='max-w-7xl p-6'>
          {dashboardData.length === 0 ? (
            <button
              className={`tablet:w-3xs mobile:w-3xs flex h-[60px] w-2xs cursor-pointer items-center justify-center gap-1 rounded-lg border hover:opacity-80 ${
                theme === 'dark' ? BUTTON_STYLES.dark : BUTTON_STYLES.light
              }`}
              onClick={handleOpenModal}
            >
              <span
                className={`text-sm font-bold ${
                  theme === 'dark' ? TEXT_STYLES.dark : TEXT_STYLES.light
                }`}
              >
                새로운 대시보드
              </span>
              <Image
                src={getThemeIcon('newDashboard', theme)}
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
                  className={`${BUTTON_STYLES.base} ${
                    theme === 'dark' ? BUTTON_STYLES.dark : BUTTON_STYLES.light
                  }`}
                  onClick={handleOpenModal}
                >
                  <span
                    className={`text-sm font-bold ${
                      theme === 'dark' ? TEXT_STYLES.dark : TEXT_STYLES.light
                    }`}
                  >
                    새로운 대시보드
                  </span>
                  <Image
                    src={getThemeIcon('newDashboard', theme)}
                    alt='새로운 대시보드'
                    width={20}
                    height={20}
                  />
                </button>

                {getCurrentPageData().map((dashboard) => {
                  return (
                    <Link
                      key={dashboard.id}
                      href={`/dashboard/${String(dashboard.id)}`}
                    >
                      <button
                        className={`tablet:w-3xs mobile:w-2xs relative flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-md border p-4 hover:opacity-80 ${
                          theme === 'dark'
                            ? BUTTON_STYLES.dark
                            : BUTTON_STYLES.light
                        }`}
                      >
                        <div
                          className={`h-2 w-2 rounded-full ${dashboard.dotcolor}`}
                        />
                        <div>
                          <span
                            className={`text-sm font-bold ${
                              theme === 'dark'
                                ? TEXT_STYLES.dark
                                : TEXT_STYLES.light
                            }`}
                          >
                            {dashboard.title} {dashboard.isOwner && '👑'}
                          </span>
                        </div>
                      </button>
                    </Link>
                  );
                })}

                <div className='col-span-full mt-4 flex items-center justify-end gap-2'>
                  <p
                    className={`text-xs ${
                      theme === 'dark' ? TEXT_STYLES.dark : TEXT_STYLES.light
                    }`}
                  >
                    {totalPages} 페이지 중 {currentPage}
                  </p>
                  <div className='flex'>
                    <button
                      disabled={currentPage === 1}
                      className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded border hover:opacity-80 disabled:cursor-not-allowed ${
                        theme === 'dark'
                          ? BUTTON_STYLES.dark
                          : BUTTON_STYLES.light
                      }`}
                      onClick={handlePrevPage}
                    >
                      <Image
                        alt='이전 페이지'
                        height={7}
                        src={getThemeIcon('prevPage', theme)}
                        width={7}
                      />
                    </button>
                    <button
                      disabled={currentPage === totalPages}
                      className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded border hover:opacity-80 disabled:cursor-not-allowed ${
                        theme === 'dark'
                          ? BUTTON_STYLES.dark
                          : BUTTON_STYLES.light
                      }`}
                      onClick={handleNextPage}
                    >
                      <Image
                        alt='다음 페이지'
                        height={7}
                        src={getThemeIcon('nextPage', theme)}
                        width={7}
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
              <div
                className={`tablet:w-lg mobile:w-3xs mt-10 flex h-[280px] w-2xl flex-col rounded-lg border-0 ${
                  theme === 'dark'
                    ? CONTAINER_STYLES.dark
                    : CONTAINER_STYLES.light
                }`}
              >
                <h2
                  className={`pt-4 pl-[28px] text-lg font-bold transition-colors hover:text-violet-500 ${
                    theme === 'dark' ? TEXT_STYLES.dark : TEXT_STYLES.light
                  }`}
                >
                  초대받은 대시보드
                </h2>
                <div className='flex flex-grow flex-col items-center justify-center gap-2'>
                  <Image
                    src={getThemeIcon('inviteEmpty', theme)}
                    alt='초대받은 대시보드'
                    width={80}
                    height={80}
                  />
                  <p
                    className={`pt-5 text-xs ${
                      theme === 'dark'
                        ? PLACEHOLDER_STYLES.dark
                        : PLACEHOLDER_STYLES.light
                    }`}
                  >
                    아직 초대받은 대시보드가 없어요
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className='mt-10'>
                  <div
                    className={`tablet:w-lg mobile:w-2xs flex h-[650px] w-4xl flex-col rounded-lg border-0 ${
                      theme === 'dark'
                        ? CONTAINER_STYLES.dark
                        : CONTAINER_STYLES.light
                    }`}
                  >
                    <h2
                      className={`mobile:text-xl py-6 pl-[28px] text-2xl font-bold ${
                        theme === 'dark' ? TEXT_STYLES.dark : 'text-gray-700'
                      }`}
                    >
                      초대받은 대시보드
                    </h2>
                    <div className='relative px-[28px]'>
                      <div className='pointer-events-none absolute inset-y-0 left-[28px] flex items-center pl-3'>
                        <Image
                          alt='검색'
                          height={20}
                          src={getThemeIcon('search', theme)}
                          width={20}
                        />
                      </div>
                      <div>
                        <input
                          id='search'
                          type='text'
                          name='search'
                          placeholder='검색'
                          value={searchQuery}
                          className={`h-[40px] w-full rounded border pr-4 pl-10 text-sm focus:ring-1 focus:outline-none ${
                            theme === 'dark'
                              ? 'border-[var(--auth-input-border)] bg-[var(--auth-input-bg)] text-[var(--auth-text-strong)] placeholder:text-[var(--auth-placeholder)] focus:ring-[var(--auth-primary)]'
                              : 'border-gray-300 focus:ring-gray-300'
                          }`}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div
                      className={`mobile:hidden tablet:grid-cols-[150px_80px_200px] tablet:pl-8 grid w-full max-w-2xl min-w-2xs grid-cols-[250px_250px_200px] gap-2 pt-5 pl-12 text-sm ${
                        theme === 'dark'
                          ? PLACEHOLDER_STYLES.dark
                          : PLACEHOLDER_STYLES.light
                      }`}
                    >
                      <div>이름</div>
                      <div>초대자</div>
                      <div className='mobile:hidden text-center'>수락 여부</div>
                    </div>
                    <div className='flex-1 overflow-y-auto'>
                      {inviteData.map((invite) => {
                        return (
                          <div
                            key={invite.id}
                            className={`mobile:flex mobile:flex-col mobile:w-full tablet:w-lg tablet:grid-cols-[150px_80px_200px] tablet:pl-8 grid grid-cols-[250px_250px_200px] items-center gap-2 border-b py-5 pl-12 text-sm ${
                              theme === 'dark'
                                ? 'border-[var(--auth-border)] text-[var(--auth-text-strong)]'
                                : 'border-gray-200 text-gray-600'
                            }`}
                          >
                            <div className='mobile:flex mobile:w-full'>
                              <p
                                className={`tablet:hidden mobile:w-16 mobile:block hidden ${
                                  theme === 'dark'
                                    ? PLACEHOLDER_STYLES.dark
                                    : PLACEHOLDER_STYLES.light
                                }`}
                              >
                                이름
                              </p>
                              <span className='mobile:ml-4'>
                                {invite.dashboard.title}
                              </span>
                            </div>
                            <div className='mobile:flex mobile:w-full'>
                              <p
                                className={`tablet:hidden mobile:w-16 mobile:block hidden ${
                                  theme === 'dark'
                                    ? PLACEHOLDER_STYLES.dark
                                    : PLACEHOLDER_STYLES.light
                                }`}
                              >
                                초대자
                              </p>
                              <span className='mobile:ml-4'>
                                {invite.inviter.nickname}
                              </span>
                            </div>
                            <div className='mobile:flex mobile:mt-2 mobile:w-full mobile:mr-8 flex items-center justify-center gap-2'>
                              <button
                                className='mobile:w-full w-20 cursor-pointer rounded py-1 text-sm text-white hover:opacity-80'
                                style={{
                                  backgroundColor: 'var(--auth-primary)',
                                }}
                                onClick={() => {
                                  handleAcceptInvitation(invite.id);
                                }}
                              >
                                수락
                              </button>
                              <button
                                className={`mobile:w-full w-20 cursor-pointer rounded border py-1 text-sm hover:opacity-80 ${
                                  theme === 'dark'
                                    ? REJECT_BUTTON_STYLES.dark
                                    : REJECT_BUTTON_STYLES.light
                                }`}
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
      <ModalPortal>
        <CreateNewboardModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleCreateDashboard}
        />
      </ModalPortal>
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
