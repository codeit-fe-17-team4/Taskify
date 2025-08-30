import Image from 'next/image';
import type { ReactNode } from 'react';

export default function InviteList(): ReactNode {
  const inviteData = [
    { id: 1, name: '프로덕트 디자인', inviter: '손동희' },
    { id: 2, name: '새로운 기획 문서', inviter: '안귀영' },
    { id: 3, name: '유닛 A', inviter: '장혁' },
    { id: 4, name: '유닛 B', inviter: '강나무' },
    { id: 5, name: '유닛 C', inviter: '김태현' },
    { id: 6, name: '유닛 D', inviter: '김태현' },
  ];

  // 추후 기능 구현 시, 내가 만든 대시보드는 왕관 아이콘 붙도록 구현
  // const dashboardList = [
  //   { id: 1, name: '비브리지' },
  //   { id: 2, name: '코드잇' },
  //   { id: 3, name: '3분기 계획' },
  //   { id: 4, name: '회의록' },
  //   { id: 5, name: '중요 문서함' },
  // ];

  // 모달 구현 확인하기!
  // const [modalStatus, setModalStatus] = useState(false);
  // const generateDashboard = () => {
  //   setModalStatus(!modalStatus);
  // };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* BG global 생성되면 수정 예정 */}
      {/* 헤더 공간 */}
      <div className='pt-16'>
        {/* 사이드바 공간 */}
        <div className='ml-40'>
          <div className='w-full max-w-4xl'>
            <div className='relative grid grid-cols-3 gap-2'>
              {/* 새로운 대시보드 */}
              <button
                // onClick={generateDashboard}
                className='flex h-[60px] w-full cursor-pointer items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white sm:w-2xs md:w-40 lg:w-md xl:w-3xs'
              >
                <span className='text-xs font-bold text-gray-600'>
                  새로운 대시보드
                </span>
                <Image
                  src='/icon/newDashboard.svg'
                  alt='새로운 대시보드'
                  width={15}
                  height={15}
                />
              </button>
              <button className='relative flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-md border border-gray-200 bg-white p-4 sm:w-2xs md:w-40 lg:w-md xl:w-3xs'>
                <Image
                  src='/icon/dot/dot4.svg'
                  alt='비브리지'
                  width={5}
                  height={5}
                />
                <div className='flex gap-1'>
                  <span className='text-xs font-bold text-gray-600'>
                    비브리지
                  </span>
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
              <button className='relative flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-md border border-gray-200 bg-white p-4 sm:w-2xs md:w-40 lg:w-md xl:w-3xs'>
                <Image
                  src='/icon/dot/dot5.svg'
                  alt='코드잇'
                  width={5}
                  height={5}
                />
                <div className='flex gap-1'>
                  <span className='text-xs font-bold text-gray-600'>
                    코드잇
                  </span>
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
              <button className='relative flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-md border border-gray-200 bg-white p-4 sm:w-2xs md:w-40 lg:w-md xl:w-3xs'>
                <Image
                  src='/icon/dot/dot3.svg'
                  alt='3분기 계획'
                  width={5}
                  height={5}
                />
                <span className='text-xs font-bold text-gray-600'>
                  3분기 계획
                </span>
                <Image
                  className='absolute right-[28px] flex'
                  src='/icon/arrow_right.svg'
                  alt='Go'
                  width={15}
                  height={15}
                />
              </button>
              <button className='relative flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-md border border-gray-200 bg-white p-4 sm:w-2xs md:w-40 lg:w-md xl:w-3xs'>
                <Image
                  src='/icon/dot/dot2.svg'
                  alt='회의록'
                  width={5}
                  height={5}
                />
                <span className='text-xs font-bold text-gray-600'>회의록</span>
                <Image
                  className='absolute right-[28px] flex'
                  src='/icon/arrow_right.svg'
                  alt='Go'
                  width={15}
                  height={15}
                />
              </button>
              <button className='relative flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-md border border-gray-200 bg-white p-4 sm:w-2xs md:w-40 lg:w-md xl:w-3xs'>
                <Image
                  src='/icon/dot/dot1.svg'
                  alt='중요 문서함'
                  width={5}
                  height={5}
                />
                <span className='text-xs font-bold text-gray-600'>
                  중요 문서함
                </span>
                <Image
                  className='absolute right-[28px] flex'
                  src='/icon/arrow_right.svg'
                  alt='Go'
                  width={15}
                  height={15}
                />
              </button>
              <p className='absolute end-30 top-35 text-xs text-gray-600'>
                1 페이지 중의 1
              </p>
              {/* 페이지네이션 라이브러리 추가 예정 */}
              <div className='flex'>
                <button className='absolute end-20 top-33 flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white'>
                  <Image
                    src='/icon/prevPage.svg'
                    alt='prev'
                    width={7}
                    height={7}
                  />
                </button>
                <button className='absolute end-10 top-33 flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white'>
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
        <div className='ml-40'>
          <div className='mt-20 flex h-[650px] w-4xl flex-col rounded-lg border-0 bg-white'>
            <h2 className='py-6 pl-[28px] text-lg font-bold text-gray-700'>
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
              <input
                id='search'
                type='text'
                name='search'
                placeholder='검색'
                className='h-[40px] w-full rounded border border-gray-300 pr-4 pl-10 text-sm focus:ring-1 focus:ring-gray-300 focus:outline-none'
              />
            </div>
            {/* 초대받은 목록 */}
            <div className='pl-12'>
              <div className='grid grid-cols-[250px_250px_200px] gap-2 pt-5 pl-4 text-sm text-gray-400'>
                <div>이름</div>
                <div>초대자</div>
                <div className='text-center'>수락 여부</div>
              </div>
              {inviteData.map((invite) => {
                return (
                  <div
                    key={invite.id}
                    className='grid grid-cols-[250px_250px_200px] items-center gap-2 border-b border-gray-200 py-5 pl-4 text-sm text-gray-600'
                  >
                    <div>{invite.name}</div>
                    <div>{invite.inviter}</div>
                    <div className='flex items-center justify-center gap-2'>
                      <button className='w-20 cursor-pointer rounded bg-blue-700 py-1 text-sm text-white'>
                        수락
                      </button>
                      <button className='w-20 cursor-pointer rounded border border-gray-300 bg-white py-1 text-sm text-blue-700'>
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
    </div>
  );
}
