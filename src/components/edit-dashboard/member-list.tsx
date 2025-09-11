// 구성원 목록 조회 및 삭제 UI 컴포넌트

import ButtonPagination from '@/components/ui/button/button-pagination';
import ChipProfile, {
  getProfileColorByIdHash,
} from '@/components/ui/chip/chip-profile';
import { useTheme } from '@/contexts/ThemeContext';
import type { MemberListType } from '@/lib/members/type';

// 접근을 하지 못하고 있길래 빼봄!
type Member = MemberListType['members'][number];

interface MemberListProps {
  members: Member[];
  currentPage: number;
  totalPages: number;
  getCurrentPageData: () => Member[];
  onDeleteMember: (memberId: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export default function MemberList({
  members,
  currentPage,
  totalPages,
  getCurrentPageData,
  onDeleteMember,
  onPrevPage,
  onNextPage,
}: MemberListProps) {
  const { theme } = useTheme();

  return (
    <div
      className={`tablet:w-full mobile:w-full tablet:min-w-lg mobile:min-w-2xs mt-8 h-[340px] w-[620px] rounded-lg pt-5 ${
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
          구성원
        </h2>
        <div className='flex items-center justify-end gap-4'>
          <p
            className={`text-sm ${
              theme === 'dark'
                ? 'text-[var(--auth-placeholder)]'
                : 'text-gray-600'
            }`}
          >
            {currentPage} / {totalPages}
          </p>
          <ButtonPagination
            isPrevDisabled={currentPage === 1}
            isNextDisabled={currentPage === totalPages}
            additionalClass={
              theme === 'dark'
                ? 'border-[var(--auth-border)] bg-[var(--auth-input-bg)] hover:bg-[var(--button-secondary-hover)]'
                : 'border-gray-200 bg-white hover:bg-gray-100'
            }
            onPrevClick={onPrevPage}
            onNextClick={onNextPage}
          />
        </div>
      </div>
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
              이름
            </th>
          </tr>
        </thead>
        <tbody>
          {getCurrentPageData().map((member, index, arr) => {
            const isLastItem = index === arr.length - 1;
            const profileLabel = member.nickname.slice(0, 1).toUpperCase();

            return (
              <tr
                key={member.id}
                className={`flex items-center justify-between pr-8 pl-8 ${
                  // eslint-disable-next-line no-nested-ternary
                  !isLastItem
                    ? theme === 'dark'
                      ? 'border-b border-[var(--auth-border)]'
                      : 'border-b border-gray-200'
                    : ''
                }`}
              >
                <td className='py-3'>
                  <div className='flex items-center gap-2'>
                    <ChipProfile
                      label={profileLabel}
                      size='sm'
                      color={getProfileColorByIdHash(member.userId)}
                      profileImageUrl={member.profileImageUrl}
                    />
                    <span>{member.nickname}</span>
                  </div>
                </td>
                <td className='py-3'>
                  <button
                    type='button'
                    className={`mobile:w-12 w-15.5 cursor-pointer rounded border px-3 py-1 text-sm transition-colors ${
                      theme === 'dark'
                        ? 'border-[var(--auth-input-border)] text-green-400 hover:bg-[var(--button-secondary-hover)]'
                        : 'border-gray-200 text-violet-500 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      onDeleteMember(member.userId);
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
  );
}
