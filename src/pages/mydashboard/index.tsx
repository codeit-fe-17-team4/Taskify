import Image from 'next/image';
import Link from 'next/link';
import { type ReactNode, useState } from 'react';
import type { CreateNewboardFormData } from '@/components/dashboard/type';
import DashboardLayout from '@/components/layout/dashboard-layout';
import CreateNewboardModal from '@/components/mydashboard/create-newboard-modal';

export default function Mydashboard(): ReactNode {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateDashboard = (formData: CreateNewboardFormData) => {
    console.log('새 대시보드 생성:', formData);
    // TODO: API call to create a new dashboard
    handleCloseModal();
  };

  return (
    <>
      <div className='flex h-full min-h-screen w-full flex-col bg-gray-50'>
        {/* 새로운 대시보드 */}
        <div className='max-w-7xl p-6'>
          <button
            className='tablet:w-3xs mobile:w-3xs flex h-[60px] w-2xs cursor-pointer items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-100'
            onClick={handleOpenModal}
          >
            <span className='text-sm font-bold text-gray-600'>
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
          <div className='tablet:w-lg mobile:w-3xs mt-10 flex h-[280px] w-2xl flex-col rounded-lg border-0 bg-white'>
            <Link href='/mydashboard/invite-list'>
              <h2 className='pt-4 pl-[28px] text-lg font-bold text-gray-600 transition-colors hover:text-violet-500'>
                초대받은 대시보드
              </h2>
            </Link>
            {/* 빈 상태 표시 */}
            <div className='flex flex-grow flex-col items-center justify-center gap-2'>
              <Image
                src='/icon/inviteEmpty.svg'
                alt='초대받은 대시보드'
                width={80}
                height={80}
              />
              <p className='pt-5 text-xs text-gray-400'>
                아직 초대받은 대시보드가 없어요
              </p>
            </div>
          </div>
        </div>
      </div>
      <CreateNewboardModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateDashboard}
      />
    </>
  );
}
Mydashboard.getLayout = function getLayout(page: ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
