import Image from 'next/image';
import type { ReactNode } from 'react';

export default function InviteList(): ReactNode {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* BG global 생성되면 수정 예정 */}
      {/* 헤더 공간 */}
      <div className='pt-16'>
        {/* 사이드바 공간 */}
        <div className='ml-40'>
          <div className='w-full max-w-4xl'>
            <div className='grid grid-cols-3 gap-2'>
              {/* 새로운 대시보드 */}
              <button className='flex h-[60px] w-full cursor-pointer items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white sm:w-2xs md:w-40 lg:w-md xl:w-3xs'>
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
            </div>
          </div>
        </div>
        {/* 초대받은 대시보드 */}
        <div className='ml-40'>
          <div className='mt-20 flex h-[650px] w-4xl flex-col rounded-lg border-0 bg-white'>
            <h2 className='py-6 pl-[28px] text-lg font-bold text-gray-600'>
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
                type='text'
                name='query'
                placeholder='검색'
                className='h-[40px] w-full rounded border border-gray-300 pr-4 pl-10 text-sm focus:ring-1 focus:ring-gray-300 focus:outline-none'
              />
            </div>
            {/* 초대받은 목록 */}
            <div className='pl-12'>
              <div className='grid grid-cols-3 gap-2 text-sm text-gray-400'>
                <div className='col-span-1 p-4'>이름</div>
                <div className='col-span-1 p-4'>초대자</div>
                <div className='col-span-1 p-4'>수락 여부</div>
                <div></div>
                <div></div>
              </div>

              <div className='grid grid-cols-3 items-center gap-2 border-b border-gray-200 text-sm text-gray-600'>
                <div className='col-span-1 p-4'>프로덕트 디자인</div>
                <div className='col-span-1 p-4'>손동희</div>
                <div className='clex col-span-1 p-4'>
                  <button className='w-15 bg-violet-300 text-sm text-white'>
                    수락
                  </button>
                  <button className='w-15 bg-white text-sm text-violet-700'>
                    거절
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
