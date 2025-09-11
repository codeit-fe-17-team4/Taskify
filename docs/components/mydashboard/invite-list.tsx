import Image from 'next/image';
import type { ReactNode } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeIcon } from '@/utils/getThemeIcon';

interface InviteList {
  id: number;
  name: string;
  inviter: string;
}
interface InviteListProps {
  inviteData: InviteList[];
}
export default function InviteList({ inviteData }: InviteListProps): ReactNode {
  const { theme } = useTheme();
  // const handleDeleteList = (listId: number) => {
  //   setListData((prevListDate) =>
  //     prevListDate.filter((list) => list.id !== listId)
  //   );
  // };

  return (
    <div className='flex min-h-screen w-full flex-col bg-gray-50'>
      <div className='tablet:w-lg mobile:w-2xs mt-5 ml-5 w-full max-w-4xl'>
        <div className='tablet:grid-cols-2 mobile:grid-cols-1 relative grid grid-cols-3 gap-2'>
          {/* 새로운 대시보드 */}
          <button
            // onClick={generateDashboard}
            className='tablet:w-3xs mobile:w-2xs flex h-[60px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-100'
          >
            <span className='text-sm font-bold text-gray-600'>
              새로운 대시보드
            </span>
            <Image
              src={getThemeIcon('newDashboard', theme)}
              alt='새로운 대시보드'
              width={20}
              height={20}
            />
          </button>
          <button className='tablet:w-3xs mobile:w-2xs relative flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-md border border-gray-200 bg-white p-4 sm:w-2xs md:w-40 lg:w-md xl:w-3xs'>
            <Image
              src='/icon/dot/dot4.svg'
              alt='비브리지'
              width={5}
              height={5}
            />
            <div className='flex gap-1'>
              <span className='text-sm font-bold text-gray-600'>비브리지</span>
              <Image
                src='/icon/mydashboard.svg'
                alt='비브리지'
                width={15}
                height={15}
              />
            </div>
            <Image
              className='absolute right-[28px] flex'
              src='/icon/arrow_right.svg'
              alt='Go'
              width={15}
              height={15}
            />
          </button>
          <button className='tablet:w-3xs mobile:w-2xs relative flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-md border border-gray-200 bg-white p-4 sm:w-2xs md:w-40 lg:w-md xl:w-3xs'>
            <Image src='/icon/dot/dot5.svg' alt='코드잇' width={5} height={5} />
            <div className='flex gap-1'>
              <span className='text-sm font-bold text-gray-600'>코드잇</span>
              <Image
                src='/icon/mydashboard.svg'
                alt='코드잇'
                width={15}
                height={15}
              />
            </div>
            <Image
              className='absolute right-[28px] flex'
              src='/icon/arrow_right.svg'
              alt='Go'
              width={15}
              height={15}
            />
          </button>
          <button className='tablet:w-3xs mobile:w-2xs relative flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-md border border-gray-200 bg-white p-4 sm:w-2xs md:w-40 lg:w-md xl:w-3xs'>
            <Image
              src='/icon/dot/dot3.svg'
              alt='3분기 계획'
              width={5}
              height={5}
            />
            <span className='text-sm font-bold text-gray-600'>3분기 계획</span>
            <Image
              className='absolute right-[28px] flex'
              src='/icon/arrow_right.svg'
              alt='Go'
              width={15}
              height={15}
            />
          </button>
          <button className='tablet:w-3xs mobile:w-2xs relative flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-md border border-gray-200 bg-white p-4 sm:w-2xs md:w-40 lg:w-md xl:w-3xs'>
            <Image src='/icon/dot/dot2.svg' alt='회의록' width={5} height={5} />
            <span className='text-sm font-bold text-gray-600'>회의록</span>
            <Image
              className='absolute right-[28px] flex'
              src='/icon/arrow_right.svg'
              alt='Go'
              width={15}
              height={15}
            />
          </button>
          <button className='tablet:w-3xs mobile:w-2xs relative flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-md border border-gray-200 bg-white p-4 sm:w-2xs md:w-40 lg:w-md xl:w-3xs'>
            <Image
              src='/icon/dot/dot1.svg'
              alt='중요 문서함'
              width={5}
              height={5}
            />
            <span className='text-sm font-bold text-gray-600'>중요 문서함</span>
            <Image
              className='absolute right-[28px] flex'
              src='/icon/arrow_right.svg'
              alt='Go'
              width={15}
              height={15}
            />
          </button>
          <div className='col-span-full mt-4 flex items-center justify-end gap-2'>
            <p className='text-xs text-gray-600'>1 페이지 중의 1</p>
            {/* 페이지네이션 라이브러리 추가 예정 */}
            <div className='flex'>
              <button className='flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-100'>
                <Image
                  src='/icon/prevPage.svg'
                  alt='prev'
                  width={7}
                  height={7}
                />
              </button>
              <button className='flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-100'>
                <Image
                  src='/icon/nextPage.svg'
                  alt='prev'
                  width={7}
                  height={7}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 초대받은 대시보드 */}
      <div className='mt-5 ml-5'>
        <div className='tablet:w-lg mobile:w-2xs flex h-[650px] w-4xl flex-col rounded-lg border-0 bg-white'>
          <h2 className='mobile:text-xl py-6 pl-[28px] text-2xl font-bold text-gray-700'>
            초대받은 대시보드
          </h2>
          <div className='relative px-[28px]'>
            <div className='pointer-events-none absolute inset-y-0 left-[28px] flex items-center pl-3'>
              <Image src='/icon/search.svg' alt='검색' width={20} height={20} />
            </div>
            <input
              id='search'
              type='text'
              name='search'
              placeholder='검색'
              className='h-[40px] w-full rounded border border-gray-300 pr-4 pl-10 text-sm focus:ring-1 focus:ring-gray-300 focus:outline-none'
            />
          </div>

          {/* 초대받은 목록 */}
          <div className=''>
            <div className='mobile:hidden tablet:grid-cols-[150px_80px_200px] tablet:pl-8 grid w-full max-w-2xl min-w-2xs grid-cols-[250px_250px_200px] gap-2 pt-5 pl-12 text-sm text-gray-400'>
              <div>이름</div>
              <div>초대자</div>
              <div className='mobile:hidden text-center'>수락 여부</div>
            </div>
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
                    <span className='mobile:ml-4'>{invite.name}</span>
                  </div>
                  <div className='mobile:flex mobile:w-full'>
                    <p className='tablet:hidden mobile:w-16 mobile:block hidden text-gray-400'>
                      초대자
                    </p>
                    <span className='mobile:ml-4'>{invite.inviter}</span>
                  </div>
                  <div className='mobile:flex mobile:mt-2 mobile:w-full mobile:mr-8 flex items-center justify-center gap-2'>
                    <button className='mobile:w-full w-20 cursor-pointer rounded bg-violet-500 py-1 text-sm text-white hover:bg-violet-600'>
                      수락
                    </button>
                    <button
                      className='mobile:w-full w-20 cursor-pointer rounded border border-gray-300 bg-white py-1 text-sm text-violet-500 hover:bg-gray-100'
                      onClick={() => {
                        // handleDeleteList(invite.id);
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
    </div>
  );
}
InviteList.getLayout = function getLayout(page: ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
