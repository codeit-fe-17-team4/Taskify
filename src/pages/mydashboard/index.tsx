import Image from 'next/image';
import type { ReactNode } from 'react';

export default function Mydashboard(): ReactNode {
  return (
    // 헤더, 사이드바 공간 필요
    <div className='min-h-screen bg-gray-50'>
      {/* BG global 생성되면 수정 예정 */}
      {/* 헤더 공간 */}
      <div className='pt-16'>
        {/* 사이드바 공간 */}
        <div className='ml-40'>
          {/* 새로운 대시보드 */}
          <div className='max-w-7xl p-6'>
            <button className='flex h-11 w-full cursor-pointer items-center justify-center gap-1 rounded border border-gray-200 bg-white sm:w-2xs md:w-40 lg:w-md xl:w-3xs'>
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
            {/* 초대받은 대시보드 */}
            <div className='mt-10 flex h-70 w-full max-w-4xl flex-col rounded-lg border-0 bg-white sm:w-2xs md:w-sm lg:w-md xl:w-3xl'>
              <h2 className='pt-4 pl-7 text-lg font-bold text-gray-600'>
                초대받은 대시보드
              </h2>
              {/* 빈 상태 표시 */}
              <div className='flex flex-grow flex-col items-center justify-center gap-4'>
                <Image
                  src='/icon/inviteEmpty.svg'
                  alt='초대받은 대시보드'
                  width={80}
                  height={80}
                />
                <p className='font text-xs text-gray-400'>
                  아직 초대받은 대시보드가 없어요
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
