import Image from 'next/image';
import Link from 'next/link';

const colorCode: { [key: string]: string } = {
  '#7AC555': 'bg-green-500',
  '#760DDE': 'bg-purple-700',
  '#FFA500': 'bg-orange-500',
  '#76A5EA': 'bg-blue-300',
  '#E876EA': 'bg-pink-400',
};

interface DashboardListProps {
  dashboards: {
    id: number;
    title: string;
    color: string;
    createdByMe: boolean;
  }[];
  totalPages: number;
  currentPage: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onOpenModal: () => void;
}

export default function DashboardList({
  dashboards,
  totalPages,
  currentPage,
  onPrevPage,
  onNextPage,
  onOpenModal,
}: DashboardListProps) {
  if (dashboards.length === 0) {
    return (
      <button
        className='tablet:w-3xs mobile:w-3xs flex h-[60px] w-2xs cursor-pointer items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white hover:bg-gray-100'
        onClick={onOpenModal}
      >
        <span className='text-base font-bold text-gray-600'>
          새로운 대시보드
        </span>
        <Image
          src='/icon/newDashboard.svg'
          alt='새로운 대시보드'
          width={15}
          height={15}
        />
      </button>
    );
  }

  return (
    <div className='tablet:w-lg mobile:w-2xs mb-10 w-full max-w-4xl'>
      <div className='tablet:grid-cols-2 mobile:grid-cols-1 relative grid grid-cols-3 gap-2'>
        {/* 새로운 대시보드 버튼 */}
        <button
          className='tablet:w-3xs mobile:w-2xs flex h-[60px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-100'
          onClick={onOpenModal}
        >
          <span className='text-base font-bold text-gray-600'>
            새로운 대시보드
          </span>
          <Image
            src='/icon/newDashboard.svg'
            alt='새로운 대시보드'
            width={20}
            height={20}
          />
        </button>

        {/* 대시보드 카드 */}
        {dashboards.map((dashboard) => {
          return (
            <Link
              key={dashboard.id}
              href={`/dashboard/${String(dashboard.id)}`}
            >
              <button className='tablet:w-3xs mobile:w-2xs relative flex h-[60px] w-full cursor-pointer items-center gap-3 rounded-md border border-gray-200 bg-white p-4 hover:bg-gray-100'>
                <div
                  className={`h-2 w-2 rounded-full ${colorCode[dashboard.color]}`}
                />
                <div>
                  <span className='text-base font-bold text-gray-600'>
                    {dashboard.title} {dashboard.createdByMe && '👑'}
                  </span>
                </div>
              </button>
            </Link>
          );
        })}

        {/* 페이지네이션 */}
        <div className='col-span-full mt-4 flex items-center justify-end gap-2'>
          <p className='text-sm text-gray-600'>
            {totalPages} 페이지 중 {currentPage}
          </p>
          <div className='flex'>
            <button
              className='flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-100 disabled:cursor-not-allowed'
              disabled={currentPage === 1}
              onClick={onPrevPage}
            >
              <Image
                src='/icon/prevPage.svg'
                alt='이전 페이지'
                width={7}
                height={7}
              />
            </button>
            <button
              className='flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-100 disabled:cursor-not-allowed'
              disabled={currentPage === totalPages}
              onClick={onNextPage}
            >
              <Image
                src='/icon/nextPage.svg'
                alt='다음 페이지'
                width={7}
                height={7}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
