import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
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
  const { theme } = useTheme();

  return (
    <div
      className={`tablet:min-w-lg mobile:min-w-2xs tablet:w-full mobile:relative mt-8 h-[400px] w-[620px] rounded-lg pt-5 ${
        theme === 'dark' ? 'bg-[#201f23]' : 'bg-white'
      }`}
    >
      <div className='flex items-center justify-between pr-8 pl-8'>
        <h2
          className={`text-xl font-bold ${
            theme === 'dark'
              ? 'text-[var(--auth-text-strong)]'
              : 'text-gray-900'
          }`}
        >
          초대 내역
        </h2>
        <div className='mobile:absolute mobile:right-5 mobile:top-5 flex items-center justify-end gap-3'>
          <div className='flex items-center justify-end gap-2'>
            <p
              className={`text-sm ${
                theme === 'dark'
                  ? 'text-[var(--auth-placeholder)]'
                  : 'text-gray-600'
              }`}
            >
              {totalPages} 페이지 중 {currentPage}
            </p>
            <div className='flex items-center justify-center'>
              <button
                className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded border ${
                  theme === 'dark'
                    ? 'border-[var(--auth-border)] bg-[var(--auth-input-bg)] hover:bg-[var(--button-secondary-hover)]'
                    : 'border-gray-200 bg-white hover:bg-gray-100'
                }`}
                onClick={onPrevPage}
              >
                <Image
                  src='/icon/prevPage.svg'
                  alt='이전 페이지'
                  width={7}
                  height={7}
                />
              </button>
              <button
                className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded border ${
                  theme === 'dark'
                    ? 'border-[var(--auth-border)] bg-[var(--auth-input-bg)] hover:bg-[var(--button-secondary-hover)]'
                    : 'border-gray-200 bg-white hover:bg-gray-100'
                }`}
                onClick={onNextPage}
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
            className={`mobile:absolute mobile:right-3 mobile:top-10 flex cursor-pointer items-center gap-2 rounded-sm py-1 pr-2 pl-2 text-white ${
              theme === 'dark'
                ? 'bg-[var(--auth-primary)] hover:bg-[var(--button-primary-hover)]'
                : 'bg-violet-500 hover:bg-violet-600'
            }`}
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
              <th
                className={`pr-8 pl-8 text-start font-normal ${
                  theme === 'dark'
                    ? 'text-[var(--auth-placeholder)]'
                    : 'text-gray-400'
                }`}
              >
                이메일
              </th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageData().map((invitation, index, arr) => {
              const isLastItem = index === arr.length - 1;
              let borderClass = '';

              if (!isLastItem) {
                borderClass =
                  theme === 'dark'
                    ? 'border-b border-[var(--auth-border)]'
                    : 'border-b border-gray-200';
              }

              return (
                <tr
                  key={invitation.id}
                  className={`flex items-center justify-between pr-8 pl-8 ${borderClass}`}
                >
                  <td className='py-3'>
                    <div className='flex items-center gap-2'>
                      <span>{invitation.invitee.email}</span>
                    </div>
                  </td>
                  <td className='py-3'>
                    <button
                      type='button'
                      className={`mobile:w-12 w-16 cursor-pointer rounded border px-3 py-1 text-sm transition-colors ${
                        theme === 'dark'
                          ? 'border-[var(--auth-input-border)] text-green-400 hover:bg-[var(--button-secondary-hover)]'
                          : 'border-gray-200 text-violet-500 hover:bg-gray-50'
                      }`}
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
