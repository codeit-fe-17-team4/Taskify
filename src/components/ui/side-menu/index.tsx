import Image from 'next/image';
import type { ReactNode } from 'react';
import ButtonPagination from '@/components/ui/button/button-pagination';
import DashboardList from '@/components/ui/side-menu/dashboard-list';

export default function SideMenu(): ReactNode {
  const handleClickPrev = () => {};
  const handleClickNext = () => {};

  return (
    <section className='tablet:w-[10rem] mobile:w-auto mobile:min-w-10 border-gray-3 fixed top-0 bottom-0 left-0 z-50 flex w-[18.75rem] flex-col gap-14 border-r-1 bg-white px-2 py-5'>
      <div className='flex-center tablet:self-center justify-center self-start'>
        <Image
          priority
          src={'/side-menu/logo.png'}
          alt='깃펜 그림'
          width={29}
          height={33}
          className='h-auto w-auto'
        />
        <Image
          priority
          src={'/side-menu/Taskify.svg'}
          alt='Taskify'
          className='mobile:hidden h-auto w-auto'
          width={80}
          height={22}
        />
      </div>
      <nav className='text-gray-1 flex flex-col gap-3'>
        <div className='mobile:justify-center flex justify-between'>
          <span className='mobile:hidden text-xs font-semibold'>
            DashBoards
          </span>
          <Image
            src={'/icon/add_box.svg'}
            alt='플러스 아이콘'
            width={20}
            height={20}
          />
        </div>
        <DashboardList />
        <div className='mt-3'>
          <ButtonPagination
            onPrevClick={handleClickPrev}
            onNextClick={handleClickNext}
            additionalClass='mobile:hidden'
          />
        </div>
      </nav>
    </section>
  );
}
