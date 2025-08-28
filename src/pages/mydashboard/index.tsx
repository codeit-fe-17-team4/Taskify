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
            <button className='flex h-11 w-3xs cursor-pointer items-center justify-center gap-1 rounded border border-gray-200 bg-white'>
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
            <div className='relative mt-10 h-70 w-3xl max-w-4xl gap-2 rounded-lg border-0 bg-white'>
              <div className='pt-4 pl-8'>
                <h2 className='text-lg font-bold text-gray-600'>
                  초대받은 대시보드
                </h2>
                {/* 빈 상태 표시 */}
                <div className='mt-4 flex flex-col items-center justify-center gap-1'>
                  <Image
                    src='/icon/inviteEmpty.svg'
                    alt='초대받은 대시보드'
                    width={15}
                    height={10}
                    style={{ width: 15, height: 15 }}
                    priority
                  />
                  <p className='font absolute text-xs text-gray-400'>
                    아직 초대받은 대시보드가 없어요
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
