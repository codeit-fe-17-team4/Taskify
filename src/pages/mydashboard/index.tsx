import Image from 'next/image';
import Link from 'next/link';
import { type ReactNode, useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import CreateNewboardModal from '@/components/mydashboard/create-newboard-modal';
import DashboardList from '@/components/mydashboard/dashboard-list';
import InviteList from '@/components/mydashboard/invite-list';
import ModalPortal from '@/components/ui/modal/modal-portal';
import { useFetch } from '@/hooks/useAsync';
import { getDashBoardList } from '@/lib/dashboards/api';
import { acceptInvitation, getInvitationList } from '@/lib/invitations/api';
import type { InvitationType } from '@/lib/invitations/type';

const colorCode: { [key: string]: string } = {
  '#7AC555': 'bg-green-500',
  '#760DDE': 'bg-purple-700',
  '#FFA500': 'bg-orange-500',
  '#76A5EA': 'bg-blue-300',
  '#E876EA': 'bg-pink-400',
};

export default function Mydashboard(): ReactNode {
  const [isAcceptingInvitation, setIsAcceptingInvitation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data: dashboardData,
    loading,
    error,
    refetch,
  } = useFetch({
    asyncFunction: () => {
      return getDashBoardList({
        navigationMethod: 'pagination',
        page: currentPage,
        size: 5, // 한 페이지에 5개씩 표시
      });
    },
    deps: [currentPage],
  });
  const { data: invitationListData, refetch: refetchInvitations } = useFetch({
    asyncFunction: () => getInvitationList({ size: 100, title: searchQuery }),
    deps: [searchQuery],
  });
  const inviteData = invitationListData?.invitations ?? [];
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!dashboardData || loading) {
    return <div> loading</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }
  // 페이지네이션 (라이브러리 x)
  const itemsPerPage = 5;
  const totalPages = Math.ceil((dashboardData?.totalCount ?? 0) / itemsPerPage);
  const getCurrentPageData = () => dashboardData.dashboards;
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
  const addDashboardToList = () => {
    refetch();
  };
  /**
   * 초대 수락 API 연동
   */
  const handleAcceptInvitation = async (inviteId: number) => {
    try {
      setIsAcceptingInvitation(true);
      await acceptInvitation({
        invitationId: inviteId,
        body: { inviteAccepted: true },
      });
      // 대시보드 목록과 초대 목록을 새로고침
      addDashboardToList();
      refetchInvitations();
      alert('초대를 수락했습니다!');
    } catch (error) {
      console.error('초대 수락 실패:', error);
      if (error instanceof Error) {
        alert(`초대 수락에 실패했습니다: ${error.message}`);
      } else {
        alert('초대 수락에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsAcceptingInvitation(false);
    }
  };
  /**
   * 초대 거절 API 연동 (PUT 요청으로 inviteAccepted: false)
   */
  const handleRejectInvitation = async (inviteId: number) => {
    if (isAcceptingInvitation) {
      return;
    }
    try {
      setIsAcceptingInvitation(true);
      await acceptInvitation({
        invitationId: inviteId,
        body: { inviteAccepted: false },
      });
      alert('초대를 거절했습니다.');
      refetchInvitations(); // 거절 후 초대 목록 새로고침
    } catch (error) {
      console.error('초대 거절 실패:', error);
    } finally {
      setIsAcceptingInvitation(false);
    }
  };

  return (
    <>
      <div className='flex h-full min-h-screen w-full flex-col bg-gray-50'>
        {/* 새로운 대시보드 */}
        <div className='max-w-7xl p-6'>
          <DashboardList
            dashboards={getCurrentPageData()}
            totalPages={totalPages}
            currentPage={currentPage}
            colorCode={colorCode} // 필요하다면 props로 전달
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            onOpenModal={handleOpenModal}
          />

          {/* {dashboardData.dashboards.length === 0 ? (
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
                      href={`/dashboard/${String(dashboard.id)}`}
                    >
                      <button className='tablet:w-3xs mobile:w-2xs relative flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-md border border-gray-200 bg-white p-4 hover:bg-gray-100'>
                        <div
                          className={`h-2 w-2 rounded-full ${colorCode[dashboard.color]}`}
                        />
                        <div>
                          <span className='text-sm font-bold text-gray-600'>
                            {dashboard.title} {dashboard.createdByMe && '👑'}
                          </span>
                        </div>
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
          )} */}
          {/* 초대받은 대시보드 */}
          <InviteList
            inviteData={inviteData}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onAccept={handleAcceptInvitation}
            onReject={handleRejectInvitation}
          />
          {/* <div>
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
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                          }}
                        />
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
          </div> */}
        </div>
      </div>
      <ModalPortal>
        <CreateNewboardModal
          isOpen={isModalOpen}
          addDashboardToList={addDashboardToList}
          onClose={handleCloseModal}
        />
      </ModalPortal>
    </>
  );
}
Mydashboard.getLayout = function getLayout(page: ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
