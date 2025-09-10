import Image from 'next/image';
import Link from 'next/link';
import { type ReactNode, useState } from 'react';
import CreateNewboardModal from '@/components/mydashboard/create-newboard-modal';
import ButtonPagination from '@/components/ui/button/button-pagination';
import ModalPortal from '@/components/ui/modal/modal-portal';
import DashboardList from '@/components/ui/side-menu/dashboard-list';
import { useFetch } from '@/hooks/useAsync';
import { getDashBoardList } from '@/lib/dashboards/api';

export default function SideMenu(): ReactNode {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 12;
  const {
    data: dashboardListData,
    loading,
    error,
    refetch,
  } = useFetch({
    asyncFunction: () => {
      return getDashBoardList({
        navigationMethod: 'pagination',
        cursorId: 0,
        page,
        size: pageSize,
      });
    },
    deps: [page],
  });

  if (!dashboardListData || error) {
    return null;
  }
  const pageCount = Math.ceil(dashboardListData.totalCount / pageSize);
  const isPrevButtonDisabled = page <= 1;
  const isNextButtonDisabled = pageCount === page;
  const handleClickPrev = () => {
    if (isPrevButtonDisabled) {
      return;
    }
    setPage((prev) => prev - 1);
  };
  const handleClickNext = () => {
    if (isNextButtonDisabled) {
      return;
    }
    setPage((prev) => prev + 1);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className='tablet:w-[10rem] mobile:w-auto mobile:min-w-10 border-gray-3 fixed top-0 bottom-0 left-0 z-25 flex w-[18.75rem] flex-col gap-14 border-r-1 bg-white px-3 py-5'>
      <Link
        href={'/'}
        className='flex-center tablet:self-center justify-center self-start'
      >
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
      </Link>
      <nav className='text-gray-1 flex flex-col gap-3'>
        <div className='mobile:justify-center flex justify-between'>
          <span className='mobile:hidden text-xs font-semibold'>
            DashBoards
          </span>
          <button onClick={handleOpenModal}>
            <Image
              src={'/icon/add_box.svg'}
              alt='플러스 아이콘'
              width={20}
              height={20}
            />
          </button>
        </div>
        <DashboardList
          dashboards={dashboardListData.dashboards}
          loading={loading}
        />
        <div className='mt-3'>
          <ButtonPagination
            additionalClass='mobile:hidden'
            isPrevDisabled={isPrevButtonDisabled}
            isNextDisabled={isNextButtonDisabled}
            onPrevClick={handleClickPrev}
            onNextClick={handleClickNext}
          />
        </div>
      </nav>
      <ModalPortal>
        <CreateNewboardModal
          isOpen={isModalOpen}
          addDashboardToList={refetch}
          onClose={handleCloseModal}
        />
      </ModalPortal>
    </section>
  );
}
