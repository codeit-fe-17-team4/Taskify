import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ReactNode, useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import InviteMemberModal from '@/components/ui/dashboard-header/invite-member-modal';
import {
  createInvitation,
  deleteDashBoard,
  deleteInvitation,
  getDashBoard,
  getInvitationList,
} from '@/lib/dashboards/api';
import type { Dashboard, InvitationType } from '@/lib/dashboards/type';
import { deleteMember, getMemberList } from '@/lib/members/api';
import type { MemberType } from '@/lib/members/type';
import { dashboardColors } from '@/lib/mydashboard-mock-data';
import { getStringFromQuery } from '@/utils/getContextQuery';

export default function MydashboardEdit(): ReactNode {
  const router = useRouter();
  const dashboardId = getStringFromQuery(router.query, 'dashboardId');
  // 대시보드 API 연동 정보
  const [dashboardData, setDashboardData] = useState<Dashboard | null>(null);
  // 구성원 정보 연동해서 가져와야 함
  const [members, setMembers] = useState<MemberType[]>([]);
  // 초대내역 이메일도 가져와야 함
  const [invitations, setInvitations] = useState<InvitationType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');

  // 대시보드 정보 가져오기
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

        setMembers(data.members);
      } catch (error) {
        console.error('구성원 목록 불러오기 실패:', error);
      }
    };

    fetchMembers();
  }, [dashboardId]);

  // 초대내역 가져오기
  useEffect(() => {
    if (!dashboardId) {
      return;
    }

    const fetchInvitationEmails = async () => {
      try {
        const data = await getInvitationList({
          dashboardId: Number(dashboardId),
        });

        setInvitations(data.invitations);
      } catch (error) {
        console.error('초대내역 불러오기 실패:', error);
      }
    };

    fetchInvitationEmails();
  }, [dashboardId]);

  const handleColorChange = (color: { name: string; bgClass: string }) => {
    setSelectedColor(color.name);
  };

  /**
   * 구성원 삭제 api 연동
   */
  const handleDeleteMember = async (memberId: number) => {
    try {
      await deleteMember(memberId);
      alert('구성원이 삭제되었습니다.');
      // 목록 새로고침 - 삭제되면서 목록이 보여야 함
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
  /**
   * 초대
   */
  const handleSubmitInviteMember = async (formData: { email: string }) => {
    if (!dashboardId) {
      return;
    }
    try {
      await createInvitation({ id: Number(dashboardId), body: formData });
      alert('성공적으로 초대했습니다.');
      handleCloseModal();
    } catch (error) {
      console.error('초대 실패:', error);
      alert('초대에 실패했습니다.');
    }
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

        {/* 대시보드 정보 수정 */}
        <div className='tablet:min-w-lg mobile:min-w-2xs tablet:w-full mobile:w-full mt-8 h-[340px] w-[620px] rounded-lg bg-white p-7'>
          <h2 className='text-xl font-bold'>{dashboardData?.title}</h2>
          <form className='mt-4 space-y-4'>
            {/* 이름 수정 */}
            <div>
              <label htmlFor='name' className='font-sm block text-base'>
                대시보드 이름
              </label>
              <input
                id='name'
                name='name'
                type='text'
                defaultValue={dashboardData?.title}
                className='mt-3 block h-12 w-full rounded-md border border-gray-300 px-4 focus:border-violet-500 focus:ring-violet-500 focus:outline-none'
              />
            </div>
            <div>
              <div className='mt-3 flex items-center gap-2'>
                {dashboardColors.map((color) => {
                  return (
                    <button
                      key={color.name}
                      type='button'
                      className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 transition-all ${
                        color.bgClass
                      } ${
                        selectedColor === color.name
                          ? 'scale-110 border-transparent'
                          : 'border-transparent hover:scale-110'
                      }`}
                      onClick={() => {
                        handleColorChange(color);
                      }}
                    >
                      {selectedColor === color.name && (
                        <Image
                          src='/icon/selected.svg'
                          alt='selected'
                          width={14}
                          height={14}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className='mt-10 flex'>
              <button
                type='submit'
                className='h-12 w-xl cursor-pointer rounded-md bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-600'
              >
                변경
              </button>
            </div>
          </form>
        </div>
        {/* 구성원 */}
        <div className='tablet:w-full mobile:w-full tablet:min-w-lg mobile:min-w-2xs mt-8 h-[340px] w-[620px] rounded-lg bg-white pt-5'>
          <div className='flex items-center justify-between pr-8 pl-8'>
            <h2 className='text-xl font-bold'>구성원</h2>
            <div className='flex items-center justify-end gap-2'>
              <p className='text-xs text-gray-600'>
                {membersTotalPages} 페이지 중 {membersCurrentPage}
              </p>
              <div className='flex items-center justify-center'>
                <button
                  className='flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-100'
                  onClick={handleMembersPrevPage}
                >
                  <Image
                    src='/icon/prevPage.svg'
                    alt='이전 페이지'
                    width={7}
                    height={7}
                  />
                </button>
                <button
                  className='flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-100'
                  onClick={handleMembersNextPage}
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
          <table className='mt-5 w-full text-center text-xs'>
            <thead>
              <tr>
                <th className='pr-8 pl-8 text-start font-normal text-gray-400'>
                  이름
                </th>
              </tr>
            </thead>
            <tbody>
              {getCurrentMembersPageData().map((member, index, arr) => {
                const isLastItem = index === arr.length - 1;

                return (
                  <tr
                    key={member.id}
                    className={`flex items-center justify-between pr-8 pl-8 ${!isLastItem ? 'border-b border-gray-200' : ''}`}
                  >
                    <td className='py-3'>
                      <div className='flex items-center gap-2'>
                        <div className='flex h-5 w-5 items-center justify-center rounded-full bg-sky-200 text-sm text-white'>
                          {member.nickname.slice(0, 1).toUpperCase()}
                        </div>
                        <span>{member.nickname}</span>
                      </div>
                    </td>
                    <td className='py-3'>
                      <button
                        type='button'
                        className='mobile:w-12 w-15.5 cursor-pointer rounded border border-gray-200 px-3 py-1 text-xs text-violet-500 transition-colors hover:bg-gray-50'
                        onClick={() => {
                          handleDeleteMember(member.id);
                        }}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* 초대 내역 */}
        <div className='tablet:min-w-lg mobile:min-w-2xs tablet:w-full mobile:relative mt-8 h-[400px] w-[620px] rounded-lg bg-white pt-5'>
          <div className='flex items-center justify-between pr-8 pl-8'>
            <h2 className='text-xl font-bold'>초대 내역</h2>
            <div className='mobile:absolute mobile:right-5 mobile:top-5 flex items-center justify-end gap-3'>
              <div className='flex items-center justify-end gap-2'>
                <p className='text-xs text-gray-600'>
                  {invitationsTotalPages} 페이지 중 {invitationsCurrentPage}
                </p>
                <div className='flex items-center justify-center'>
                  <button
                    className='flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-100'
                    onClick={handleInvitationsPrevPage}
                  >
                    <Image
                      src='/icon/prevPage.svg'
                      alt='이전 페이지'
                      width={7}
                      height={7}
                    />
                  </button>
                  <button
                    className='flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-100'
                    onClick={handleInvitationsNextPage}
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
              <button
                className='mobile:absolute mobile:right-3 mobile:top-10 flex cursor-pointer items-center gap-2 rounded-sm bg-violet-500 py-1 pr-2 pl-2 text-white hover:bg-violet-600'
                onClick={handleOpenModal}
              >
                <Image
                  src='/icon/addmember.svg'
                  alt='add-member'
                  width={20}
                  height={20}
                />
                <span className='text-xs'>초대하기</span>
              </button>
            </div>
          </div>
          <div>
            <table className='mt-5 w-full text-center text-xs'>
              <thead>
                <tr>
                  <th className='pr-8 pl-8 text-start font-normal text-gray-400'>
                    이메일
                  </th>
                </tr>
              </thead>
              <tbody>
                {getCurrentInvitationsPageData().map(
                  (invitation, index, arr) => {
                    const isLastItem = index === arr.length - 1;

                    return (
                      <tr
                        key={invitation.id}
                        className={`flex items-center justify-between pr-8 pl-8 ${
                          !isLastItem ? 'border-b border-gray-200' : ''
                        }`}
                      >
                        <td className='py-3'>
                          <div className='flex items-center gap-2'>
                            <span>{invitation.invitee.email}</span>
                          </div>
                        </td>
                        <td className='py-3'>
                          <button
                            type='button'
                            className='mobile:w-12 w-16 cursor-pointer rounded border border-gray-200 px-3 py-1 text-xs text-violet-500 transition-colors hover:bg-gray-50'
                            onClick={() => {
                              handleDeleteInvitation(invitation.id);
                            }}
                          >
                            취소
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
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
