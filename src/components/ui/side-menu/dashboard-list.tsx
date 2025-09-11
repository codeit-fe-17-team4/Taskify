import Image from 'next/image';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import Dot from '@/components/ui/side-menu/dot';
import SideMenuSkeleton from '@/components/ui/side-menu/skeleton';
import type { DashboardType } from '@/lib/dashboards/type';
import { cn } from '@/utils/cn';
import type { dashboardColorType } from '@/utils/dashboard-color';
import { getStringFromQuery } from '@/utils/getContextQuery';

interface DashboardListProps {
  dashboards: DashboardType[];
  loading: boolean;
}
export default function DashboardList({
  dashboards,
  loading,
}: DashboardListProps): ReactNode {
  const router = useRouter();
  const dashboardId = getStringFromQuery(router.query, 'dashboardId');
  const handleClickItem = (id: number) => {
    router.push(`/dashboard/${String(id)}`);
  };

  if (loading) {
    return <SideMenuSkeleton />;
  }

  return (
    <ul>
      {dashboards.map((dashboard) => {
        return (
          <li key={dashboard.id}>
            <button
              className={cn(
                `mobile:flex-center hover:bg-gray-5 active:bg-violet-light flex w-full cursor-pointer gap-2.5 rounded-sm p-3`,
                dashboardId &&
                  Number(dashboardId) === dashboard.id &&
                  `bg-violet-light hover:bg-violet-light active:bg-violet-light`
              )}
              onClick={() => {
                handleClickItem(dashboard.id);
              }}
            >
              <span
                className={`${hexToClassName[dashboard.color as dashboardColorType]} self-center`}
              >
                <Dot />
              </span>
              <div className='mobile:hidden flex gap-1.5'>
                <span className='text-2lg tablet:text-md font-medium'>
                  {dashboard.title.length > 20
                    ? `${dashboard.title.slice(0, 20)}...`
                    : dashboard.title}
                </span>
                {dashboard.createdByMe && (
                  <Image
                    src={'/icon/mydashboard.svg'}
                    className='h-[14px] w-[18px] self-center'
                    alt='왕관 아이콘'
                    width={16}
                    height={12}
                  />
                )}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
const hexToClassName = {
  '#7AC555': '*:fill-green',
  '#760DDE': '*:fill-purple',
  '#FFA500': '*:fill-orange',
  '#76A5EA': '*:fill-blue',
  '#E876EA': '*:fill-pink',
};
