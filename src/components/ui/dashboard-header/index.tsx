import Image from 'next/image';
import type { ReactNode } from 'react';
import ChipProfile from '@/components/ui/chip/chip-profile';
import ProfileList from '@/components/ui/dashboard-header/profile-list';

export default function DashboardHeader(): ReactNode {
  return (
    <header className='mobile:h-[3.75rem] tablet:pr-8 mobile:pr-2 border-gray-3 tablet:pl-48 mobile:pl-12 tablet:justify-end fixed top-0 right-0 left-0 z-50 flex h-[4.375rem] w-full items-center justify-between border-b-1 bg-white pr-20 pl-96'>
      <h1 className='tablet:hidden text-xl font-bold text-black'>
        내 대시보드
      </h1>
      <nav className='mobile:gap-2 flex items-center gap-8'>
        <div className='mobile:gap-1.5 flex gap-3'>
          <button className='flex-center border-gray-3 text-md mobile:px-3 mobile:py-1.5 h-9 gap-2 rounded-lg border-1 px-4 py-2.5'>
            <Image
              className='mobile:hidden'
              src={'/icon/settings.svg'}
              alt='설정 아이콘'
              width={20}
              height={20}
            />
            <span>관리</span>
          </button>
          <button className='flex-center border-gray-3 text-md mobile:px-3 mobile:py-1.5 h-9 gap-2 rounded-lg border-1 px-4 py-2.5'>
            <Image
              className='mobile:hidden'
              src={'/icon/add_box.svg'}
              alt='추가 아이콘'
              width={20}
              height={20}
            />
            <span>초대하기</span>
          </button>
        </div>
        <div className='mobile:gap-3 flex gap-6'>
          <ProfileList />
          <div className='border-l-gray-3 mobile:pl-3 flex items-center gap-3 border-l-1 pl-6'>
            <ChipProfile label={'K'} size='lg' color='green' />
            <span className='mobile:hidden font-medium'>권수형</span>
          </div>
        </div>
      </nav>
    </header>
  );
}
