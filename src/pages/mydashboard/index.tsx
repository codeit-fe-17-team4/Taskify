import { type ReactNode, useCallback, useState } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import CreateNewboardModal from '@/components/mydashboard/create-newboard-modal';
import DashboardList from '@/components/mydashboard/dashboard-list';
import InvitationList from '@/components/mydashboard/invitation-list';
import PeekabooLoader from '@/components/ui/loader/peekabooLoader';
import ModalPortal from '@/components/ui/modal/modal-portal';
import { useFetch } from '@/hooks/useAsync';
import { useCursorInfiniteScroll } from '@/hooks/useCursorInfiniteScroll';
import { getDashBoardList } from '@/lib/dashboards/api';
import { acceptInvitation, getInvitationList } from '@/lib/invitations/api';
import type { InvitationType } from '@/lib/invitations/type';

export default function Mydashboard(): ReactNode {
  const [isAcceptingInvitation, setIsAcceptingInvitation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedSearchQuery, setSubmittedSearchQuery] = useState('');
  const [isComposing, setIsComposing] = useState<boolean>(false);

  const {
    data: dashboardData,
    loading: dashboardLoading,
    error: dashboardError,
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

  /* 초대받은 목록 API 연동 */
  const {
    data: inviteData,
    isLoading,
    error: invitationError,
    hasMore,
    ref,
    refresh,
  } = useCursorInfiniteScroll<InvitationType>({
    fetchData: useCallback(
      async (cursorId?: number) => {
        const result = await getInvitationList({
          size: 10,
          title: submittedSearchQuery,
          cursorId,
        });

        return { data: result.invitations, nextCursorId: result.cursorId };
      },
      [submittedSearchQuery]
    ),
    deps: [submittedSearchQuery], // Enter 키 입력으로 확정된 검색어로만 훅 재실행
  });

  const handleComposition = (e: React.CompositionEvent<HTMLInputElement>) => {
    setIsComposing(e.type === 'compositionstart');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      setSubmittedSearchQuery(searchQuery);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!dashboardData || dashboardLoading) {
    return <PeekabooLoader />;
  }

  if (dashboardError) {
    return <div>Error ... </div>;
  }

  // if (!inviteData || invitationLoading) {
  //   return <div> loading ...</div>;
  // }

  if (invitationError) {
    return <div>Error ... </div>;
  }

  // 페이지네이션 (라이브러리 x)
  const itemsPerPage = 5;
  const totalPages = Math.ceil(dashboardData.totalCount / itemsPerPage);
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
      await refresh();
      alert('초대를 수락했습니다!');
    } catch (error) {
      console.error('초대 수락 실패:', error);
      if (error instanceof Error) {
        alert(`초대 수락에 실패했습니다: ${error.message}`);
      }
    } finally {
      setIsAcceptingInvitation(false);
    }
  };
  /**
   * 초대 거절 API 연동
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
      await refresh(); // 거절 후 초대 목록 새로고침
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
            onPrevPage={handlePrevPage}
            onNextPage={handleNextPage}
            onOpenModal={handleOpenModal}
          />

          {/* 초대받은 대시보드 */}
          <InvitationList
            inviteData={inviteData}
            searchQuery={searchQuery}
            handleComposition={handleComposition}
            loaderRef={ref}
            hasMore={hasMore}
            onAccept={handleAcceptInvitation}
            onReject={handleRejectInvitation}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
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
