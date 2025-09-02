import type { ReactNode } from 'react';
import ChipProfile from '@/components/ui/chip/chip-profile';

export default function DashboardHeader(): ReactNode {
  return (
    <header className='mobile:h-[3.75rem] fixed top-0 right-0 left-0 flex h-[4.375rem] items-center justify-between bg-white'>
      <title className='text-xl font-bold text-black'>내 대시보드</title>
      <nav className='flex items-center'>
        <button>관리</button>
        <button>초대하기</button>
        <div className='flex items-center'>
          <ChipProfile label={'Y'} size='lg' color='yellow' />
          <ChipProfile label={'C'} size='lg' color='blue' />
          <ChipProfile label={'K'} size='lg' color='brown' />
        </div>
        <div className='flex items-center'>
          <ChipProfile label={'K'} size='lg' color='green' />
          <span>권수형</span>
        </div>
      </nav>
    </header>
  );
}
