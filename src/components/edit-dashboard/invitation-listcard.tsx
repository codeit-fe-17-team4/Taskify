import Image from 'next/image';
import ButtonPagination from '@/components/ui/button/button-pagination';
import type { InvitationType } from '@/lib/invitations/type';

interface InvitationListCardProps {
  currentPage: number;
  totalPages: number;
  getCurrentPageData: () => InvitationType[];
  onDeleteMember: (memberId: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onOpenModal: () => void;
}

export default function InvitationListCard({
  currentPage,
  totalPages,
  getCurrentPageData,
  onDeleteMember,
  onPrevPage,
  onNextPage,
  onOpenModal,
}: InvitationListCardProps) {
  return (
    <div className='tablet:min-w-lg mobile:min-w-2xs tablet:w-full mobile:relative mt-8 h-[400px] w-[620px] rounded-lg bg-white pt-5'>
      <div className='flex items-center justify-between pr-8 pl-8'>
        <h2 className='text-xl font-bold'>초대 내역</h2>
        <div className='mobile:absolute mobile:right-5 mobile:top-5 flex items-center justify-end gap-3'>
          <div className='flex items-center justify-end gap-2'>
            <p className='text-sm text-gray-600'>
              {currentPage} / {totalPages}
            </p>
            <ButtonPagination
              isPrevDisabled={currentPage === 1}
              isNextDisabled={currentPage === totalPages}
              onPrevClick={onPrevPage}
              onNextClick={onNextPage}
            />
          </div>
          <button
            className='mobile:absolute mobile:right-3 mobile:top-10 flex cursor-pointer items-center gap-2 rounded-sm bg-violet-500 py-1 pr-2 pl-2 text-white hover:bg-violet-600'
            onClick={onOpenModal}
          >
            <Image
              src='/icon/addmember.svg'
              alt='add-member'
              width={20}
              height={20}
            />
            <span className='text-sm'>초대하기</span>
          </button>
        </div>
      </div>
      <div>
        <table className='mt-5 w-full text-center text-base'>
          <thead>
            <tr>
              <th className='pr-8 pl-8 text-start font-normal text-gray-400'>
                이메일
              </th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageData().map((invitation, index, arr) => {
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
                      className='mobile:w-12 w-16 cursor-pointer rounded border border-gray-200 px-3 py-1 text-sm text-violet-500 transition-colors hover:bg-gray-50'
                      onClick={() => {
                        onDeleteMember(invitation.id);
                      }}
                    >
                      취소
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
