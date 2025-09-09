import Image from 'next/image';
import { useState } from 'react';
import { useFetch } from '@/hooks/useAsync';
import { acceptInvitation, getInvitationList } from '@/lib/invitations/api';
import type { InvitationType } from '@/lib/invitations/type';

interface InvitationListResponse {
  invitations: InvitationType[];
  cursorId: number | null;
}

interface InviteListProps {
  addDashboardToList: () => void;
}

export default function InviteList({ addDashboardToList }: InviteListProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data,
    loading,
    error,
    refetch: refetchInvitations,
  } = useFetch<InvitationListResponse>({
    asyncFunction: () => getInvitationList({ size: 10, title: '' }),
    deps: [searchQuery],
  });

  const inviteData = data?.invitations ?? [];

  if (loading) {
    return <p>로딩중</p>;
  }
  if (error) {
    return <p>에러가 발생했습니다.</p>;
  }

  /**
   * 초대 수락 API 연동
   */
  const handleAcceptInvitation = async (inviteId: number) => {
    if (isSubmitting) {
      return;
    }
    try {
      setIsSubmitting(true);

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
      setIsSubmitting(false);
    }
  };

  /**
   * 초대 거절 API 연동
   */
  const handleRejectInvitation = async (inviteId: number) => {
    if (isSubmitting) {
      return;
    }
    try {
      setIsSubmitting(true);
      await acceptInvitation({
        invitationId: inviteId,
        body: { inviteAccepted: false },
      });
      alert('초대를 거절했습니다.');
      refetchInvitations(); // 거절 후 초대 목록 새로고침
    } catch (error) {
      console.error('초대 거절 실패:', error);
      alert('초대 거절에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
                            if (isSubmitting) {
                              return;
                            }
                            handleAcceptInvitation(invite.id);
                          }}
                        >
                          수락
                        </button>
                        <button
                          className='mobile:w-full w-20 cursor-pointer rounded border border-gray-300 bg-white py-1 text-sm text-violet-500 hover:bg-gray-100'
                          onClick={() => {
                            if (isSubmitting) {
                              return;
                            }
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
  );
}
