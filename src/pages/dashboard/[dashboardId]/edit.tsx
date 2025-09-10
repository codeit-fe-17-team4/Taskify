import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ReactNode, useEffect, useState } from 'react';
import EditDashboardForm from '@/components/edit-dashboard/edit-dashboard-form';
import InvitationListCard from '@/components/edit-dashboard/invitation-listcard';
import MemberList from '@/components/edit-dashboard/member-list';
import DashboardLayout from '@/components/layout/dashboard-layout';
import InviteMemberModal from '@/components/ui/dashboard-header/invite-member-modal';
import {
  createInvitation,
  deleteDashBoard,
  deleteInvitation,
  editDashBoard,
  getDashBoard,
  getInvitationList,
} from '@/lib/dashboards/api';
import type { DashboardType, InvitationType } from '@/lib/dashboards/type';
import { deleteMember, getMemberList } from '@/lib/members/api';
import type { MemberListType } from '@/lib/members/type';
import { getStringFromQuery } from '@/utils/getContextQuery';

type Member = MemberListType['members'][number];

export default function MydashboardEdit(): ReactNode {
  const router = useRouter();
  const dashboardId = getStringFromQuery(router.query, 'dashboardId');
  // 대시보드 API 연동 정보
  const [dashboardData, setDashboardData] = useState<DashboardType | null>(
    null
  );
  const [updating, setUpdating] = useState(false);
  // 구성원 정보 연동해서 가져와야 함
  const [members, setMembers] = useState<Member[]>([]);
  // 초대내역 이메일도 가져와야 함
  const [invitations, setInvitations] = useState<InvitationType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 대시보드 정보 가져오기 (최초 렌더링)
  useEffect(() => {
    if (!dashboardId) {
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const data = await getDashBoard(Number(dashboardId));

        if (!data.createdByMe) {
          alert('대시보드 수정이 불가합니다.');
          router.push(`/dashboard/${dashboardId}`);

          return;
        }
        setDashboardData(data);
      } catch (error) {
        console.error('대시보드 정보 불러오기 실패:', error);
        alert('대시보드 정보를 불러올 수 없습니다.');
        router.push('/mydashboard');
      }
    };

    fetchDashboardData();
  }, [dashboardId, router]);

  // 구성원 목록 가져오기
  useEffect(() => {
    if (!dashboardId) {
      return;
    }

    const fetchMembers = async () => {
      try {
        const data = await getMemberList({ dashboardId: Number(dashboardId) });

        console.log('구성원 API 응답:', data);
        setMembers(data.members);
      } catch (error) {
        console.error('구성원 목록 불러오기 실패:', error);
      }
    };

    fetchMembers();
  }, [dashboardId]);

  const fetchInvitationEmails = async () => {
    if (!dashboardId) {
      return;
    }
    try {
      const data = await getInvitationList({
        dashboardId: Number(dashboardId),
        page: 1,
        size: 10,
      });

      console.log('초대 API 응답:', data);
      console.log('invitations 필드:', data.invitations);

      setInvitations(data.invitations);
    } catch (error) {
      console.error('초대내역 불러오기 실패:', error);
    }
  };

  // 초대내역 가져오기 (최초 렌더링 시 보임))
  useEffect(() => {
    fetchInvitationEmails();
  }, [dashboardId]);

  /**
   * 초대
   */
  const handleSubmitInviteMember = async (formData: {
    nickname: string;
    email: string;
  }) => {
    if (!dashboardId) {
      return;
    }
    try {
      await createInvitation({ id: Number(dashboardId), body: formData });
      alert('초대요청을 보냈습니다.');
      handleCloseModal();

      await fetchInvitationEmails();
    } catch (error) {
      console.error('초대 실패:', error);
      alert('초대요청이 실패했습니다.');
    }
  };

  /**
   * 구성원 삭제 api 연동
   */
  const handleDeleteMember = async (memberId: number) => {
    if (!dashboardId) {
      return;
    }

    if (!window.confirm('구성원을 삭제하시겠습니까?')) {
      return;
    }
    try {
      await deleteMember(memberId);
      alert('구성원을 삭제했습니다.');
      // 목록 새로고침
      setMembers((prev) => prev.filter((member) => member.id !== memberId));
    } catch (error) {
      console.error('구성원 삭제 실패:', error);
      alert('구성원 삭제에 실패했습니다.');
    }
  };

  /**
   * 초대내역 삭제(취소) api 연동
   */
  const handleDeleteInvitation = async (invitationId: number) => {
    if (!dashboardId) {
      return;
    }
    try {
      await deleteInvitation({
        dashboardId: Number(dashboardId),
        invitationId,
      });
      alert('초대를 취소했습니다.');
      // 목록 새로고침
      setInvitations((prev) =>
        prev.filter((invitation) => invitation.id !== invitationId)
      );
    } catch (error) {
      console.error('초대내역 삭제 실패:', error);
      alert('초대 취소에 실패했습니다.');
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [deletingDashboard, setDeletingDashboard] = useState(false);
  const handleDeleteDashboard = async () => {
    if (!dashboardId || deletingDashboard) {
      return;
    }

    if (window.confirm('정말로 대시보드를 삭제하시겠습니까?')) {
      try {
        setDeletingDashboard(true);
        await deleteDashBoard(Number(dashboardId));
        alert('대시보드가 삭제되었습니다.');
        router.push('/mydashboard');
      } catch (error) {
        console.error('대시보드 삭제 실패:', error);
        alert('대시보드 삭제에 실패했습니다. 다시 시도해주세요.');
      } finally {
        setDeletingDashboard(false);
      }
    }
  };

  // 구성원 페이지네이션
  const [membersCurrentPage, setMembersCurrentPage] = useState(1);
  const membersItemsPerPage = 4;
  const membersTotalPages = Math.ceil(members.length / membersItemsPerPage);

  const getCurrentMembersPageData = () => {
    const startIndex = (membersCurrentPage - 1) * membersItemsPerPage;
    const endIndex = startIndex + membersItemsPerPage;

    return members.slice(startIndex, endIndex);
  };

  const handleMembersPrevPage = () => {
    if (membersCurrentPage > 1) {
      setMembersCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleMembersNextPage = () => {
    if (membersCurrentPage < membersTotalPages) {
      setMembersCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // 초대내역 페이지네이션
  const [invitationsCurrentPage, setInvitationsCurrentPage] = useState(1);
  const invitationsItemsPerPage = 5;
  const invitationsTotalPages = Math.ceil(
    invitations.length / invitationsItemsPerPage
  );

  const getCurrentInvitationsPageData = () => {
    const startIndex = (invitationsCurrentPage - 1) * invitationsItemsPerPage;
    const endIndex = startIndex + invitationsItemsPerPage;

    return invitations.slice(startIndex, endIndex);
  };

  const handleInvitationsPrevPage = () => {
    if (invitationsCurrentPage > 1) {
      setInvitationsCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleInvitationsNextPage = () => {
    if (invitationsCurrentPage < invitationsTotalPages) {
      setInvitationsCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='mr-120 ml-5 min-w-2xs pt-5'>
        {dashboardId && (
          <Link href={`/dashboard/${dashboardId}`}>
            <div className='flex w-full cursor-pointer items-center gap-2'>
              <Image
                src='/icon/goback.svg'
                alt='go-back'
                width={10}
                height={10}
              />
              <span>돌아가기</span>
            </div>
          </Link>
        )}

        {/* 대시보드 정보 수정 */}
        {dashboardData && (
          <EditDashboardForm
            prevTitle={dashboardData.title}
            prevColor={dashboardData.color}
            onSubmit={async ({ title, color }) => {
              if (!dashboardId || updating) {
                return;
              }
              try {
                setUpdating(true);
                const updatedDashboard = await editDashBoard({
                  id: Number(dashboardId),
                  body: { title, color }, // hex 값
                });

                setDashboardData(updatedDashboard); // 상태 갱신
                alert('대시보드가 수정되었습니다.');
              } catch (error) {
                console.error('대시보드 수정 실패:', error);
                alert('수정에 실패했습니다.');
              } finally {
                setUpdating(false);
              }
            }}
          />
        )}

        {/* 구성원 */}
        <MemberList
          members={members}
          currentPage={membersCurrentPage}
          totalPages={membersTotalPages}
          getCurrentPageData={getCurrentMembersPageData}
          onDeleteMember={handleDeleteMember}
          onPrevPage={handleMembersPrevPage}
          onNextPage={handleMembersNextPage}
        />
        {/* 초대내역 */}
        <InvitationListCard
          currentPage={invitationsCurrentPage}
          totalPages={invitationsTotalPages}
          getCurrentPageData={getCurrentInvitationsPageData}
          onDeleteMember={handleDeleteInvitation}
          onPrevPage={handleInvitationsPrevPage}
          onNextPage={handleInvitationsNextPage}
          onOpenModal={handleOpenModal}
        />

        {/* 대시보드 삭제 */}
        <div>
          <button
            type='button'
            className='mobile:max-w-2xs my-6 h-12 w-xs cursor-pointer rounded-sm border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100'
            disabled={deletingDashboard}
            onClick={handleDeleteDashboard}
          >
            {deletingDashboard ? '삭제 중...' : '대시보드 삭제하기'}
          </button>
        </div>
        <InviteMemberModal
          isOpen={isModalOpen}
          dashboardId={dashboardId}
          onClose={handleCloseModal}
          onSubmit={handleSubmitInviteMember}
        />
      </div>
    </div>
  );
}

MydashboardEdit.getLayout = function getLayout(page: ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
