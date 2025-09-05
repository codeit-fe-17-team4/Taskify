import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import ButtonPagination from '@/components/ui/button/button-pagination';
import DashboardList from '@/components/ui/side-menu/dashboard-list';

export default function SideMenu(): ReactNode {
  const handleClickPrev = () => {
    console.log('click');
  };
  const handleClickNext = () => {
    console.log('click');
  };

  return (
    <section className='border-gray-3 fixed top-0 bottom-0 left-0 z-50 flex w-[18.75rem] flex-col gap-14 border-r-1 bg-white px-3 py-5'>
      <Link href={'/'} className='flex-center justify-center self-start'>
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
          className='h-auto w-auto'
          width={80}
          height={22}
        />
      </Link>
      <nav className='text-gray-1 flex flex-col gap-3'>
        <div className='flex justify-between'>
          <span className='text-xs font-semibold'>DashBoards</span>
          <button className='cursor-pointer'>
            <Image
              src={'/icon/add_box.svg'}
              alt='플러스 아이콘'
              width={20}
              height={20}
            />
          </button>
        </div>
        <DashboardList />
        <div className='mt-3'>
          <ButtonPagination
            additionalClass=''
            onPrevClick={handleClickPrev}
            onNextClick={handleClickNext}
          />
        </div>
      </nav>
    </section>
  );
}
