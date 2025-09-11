// 구성원 목록 조회 및 삭제 UI 컴포넌트

import Image from 'next/image';
import ChipProfile, {
  getProfileColorByIdHash,
} from '@/components/ui/chip/chip-profile';
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
  return (
    <div className='tablet:w-full mobile:w-full tablet:min-w-lg mobile:min-w-2xs mt-8 h-[340px] w-[620px] rounded-lg bg-white pt-5'>
      <div className='flex items-center justify-between pr-8 pl-8'>
        <h2 className='text-xl font-bold'>구성원</h2>
        <div className='flex items-center justify-end gap-2'>
          <p className='text-sm text-gray-600'>
            {totalPages} 페이지 중 {currentPage}
          </p>
          <div className='flex items-center justify-center'>
            <button
              className='flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-100'
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
              className='flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-100'
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
      </div>
      <table className='mt-5 w-full text-center text-base'>
        <thead>
          <tr>
            <th className='pr-8 pl-8 text-start font-normal text-gray-400'>
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
                className={`flex items-center justify-between pr-8 pl-8 ${!isLastItem ? 'border-b border-gray-200' : ''}`}
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
                    className='mobile:w-12 w-15.5 cursor-pointer rounded border border-gray-200 px-3 py-1 text-sm text-violet-500 transition-colors hover:bg-gray-50'
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
