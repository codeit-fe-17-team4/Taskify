import Image from 'next/image';
import LoadingCircle from '@/components//ui/loading-circle';
import type { InvitationType } from '@/lib/invitations/type';

interface InviteListProps {
  inviteData: InvitationType[];
  invitationLoading: boolean;
  searchQuery: string;
  onAccept: (inviteId: number) => void;
  onReject: (inviteId: number) => void;
  handleComposition: (e: React.CompositionEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  loaderRef: (node?: Element | null) => void;
  hasMore: boolean;
}

export default function InvitationList({
  inviteData,
  invitationLoading,
  searchQuery,
  onAccept,
  onReject,
  handleComposition,
  loaderRef,
  hasMore,
  onChange,
  onKeyDown,
}: InviteListProps) {
  const searchEmpty = () => {
    if (searchQuery.trim()) {
      return (
        <div className='tablet:w-lg mobile:w-2xs flex h-[650px] w-4xl flex-col rounded-lg border-0 bg-white'>
          <h2 className='mobile:text-xl py-6 pl-[28px] text-2xl font-bold text-gray-700'>
            초대받은 대시보드
          </h2>
          <div className='relative px-[28px]'>
            <div className='pointer-events-none absolute inset-y-0 left-[28px] flex items-center pl-3'>
              <Image src='/icon/search.svg' alt='검색' width={20} height={20} />
            </div>
            <div>
              <input
                id='search'
                type='text'
                name='search'
                placeholder='검색'
                className='h-[40px] w-full rounded border border-gray-300 pr-4 pl-10 text-sm focus:ring-1 focus:ring-gray-300 focus:outline-none'
                value={searchQuery}
                onCompositionStart={handleComposition}
                onCompositionEnd={handleComposition}
                onChange={onChange}
                onKeyDown={onKeyDown}
              />
            </div>
          </div>
          <div className='flex flex-grow flex-col items-center justify-center gap-2'>
            <Image
              src='/icon/search.svg'
              alt='검색 없음'
              width={50}
              height={50}
            />
            <p className='pt-5 text-lg text-gray-400'>
              `{searchQuery}`에 대한 결과가 없습니다.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className='tablet:w-lg mobile:w-3xs mt-10 flex h-[280px] w-2xl flex-col rounded-lg border-0 bg-white'>
        <h2 className='pt-4 pl-[28px] text-2xl font-bold text-gray-600'>
          초대받은 대시보드
        </h2>
        <div className='flex flex-grow flex-col items-center justify-center gap-2'>
          <Image
            src='/icon/inviteEmpty.svg'
            alt='초대받은 대시보드'
            width={80}
            height={80}
          />
          <p className='pt-5 text-lg text-gray-400'>
            아직 초대받은 대시보드가 없어요
          </p>
        </div>
      </div>
    );
  };

  if (inviteData.length === 0) {
    return <div>{searchEmpty()}</div>;
  }

  return (
    <div className='mt-10'>
      <div className='tablet:w-lg mobile:w-2xs flex h-[650px] w-4xl flex-col rounded-lg border-0 bg-white'>
        <h2 className='mobile:text-xl py-6 pl-[28px] text-2xl font-bold text-gray-700'>
          초대받은 대시보드
        </h2>
        <div className='relative px-[28px]'>
          <div className='pointer-events-none absolute inset-y-0 left-[28px] flex items-center pl-3'>
            <Image src='/icon/search.svg' alt='검색' width={20} height={20} />
          </div>
          <div>
            <input
              id='search'
              type='text'
              name='search'
              placeholder='검색'
              className='h-[40px] w-full rounded border border-gray-300 pr-4 pl-10 text-sm focus:ring-1 focus:ring-gray-300 focus:outline-none'
              value={searchQuery}
              onCompositionStart={handleComposition}
              onCompositionEnd={handleComposition}
              onChange={onChange}
              onKeyDown={onKeyDown}
            />
          </div>
        </div>

        <div className='mobile:hidden tablet:grid-cols-[150px_80px_200px] tablet:pl-8 grid w-full max-w-2xl min-w-2xs grid-cols-[250px_250px_200px] gap-2 pt-5 pl-12 text-base text-gray-400'>
          <div>이름</div>
          <div>초대자</div>
          <div className='mobile:hidden text-center'>수락 여부</div>
        </div>
        <div className='relative flex-1 overflow-y-auto'>
          {inviteData.map((invite) => {
            return (
              <div
                key={invite.id}
                className='mobile:flex mobile:flex-col mobile:w-full tablet:w-lg tablet:grid-cols-[150px_80px_200px] tablet:pl-8 grid grid-cols-[250px_250px_200px] items-center gap-2 border-b border-gray-200 py-5 pl-12 text-base text-gray-600'
              >
                <div className='mobile:flex mobile:w-full'>
                  <p className='tablet:hidden mobile:w-16 mobile:block hidden text-gray-400'>
                    이름
                  </p>
                  <span className='mobile:ml-4'>{invite.dashboard.title}</span>
                </div>
                <div className='mobile:flex mobile:w-full'>
                  <p className='tablet:hidden mobile:w-16 mobile:block hidden text-gray-400'>
                    초대자
                  </p>
                  <span className='mobile:ml-4'>{invite.inviter.nickname}</span>
                </div>
                <div className='mobile:flex mobile:mt-2 mobile:w-full mobile:mr-8 flex items-center justify-center gap-2'>
                  <button
                    className='mobile:w-full w-20 cursor-pointer rounded bg-violet-500 py-1 text-base text-white hover:bg-violet-600'
                    onClick={() => {
                      onAccept(invite.id);
                    }}
                  >
                    수락
                  </button>
                  <button
                    className='mobile:w-full w-20 cursor-pointer rounded border border-gray-300 bg-white py-1 text-base text-violet-500 hover:bg-gray-100'
                    onClick={() => {
                      onReject(invite.id);
                    }}
                  >
                    거절
                  </button>
                </div>
              </div>
            );
          })}
          <span>{invitationLoading && <LoadingCircle />}</span>
          {hasMore && <div ref={loaderRef} className='h-10' />}
        </div>
      </div>
    </div>
  );
}
