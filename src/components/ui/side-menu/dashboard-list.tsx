import Image from 'next/image';
import type { ReactNode } from 'react';
import Dot from '@/components/ui/side-menu/dot';
import type { DashboardType } from '@/lib/dashboards/type';
import { cn } from '@/utils/cn';
import type { dashboardColorType } from '@/utils/dashboard-color';

export default function DashboardList({
  dashboards,
}: {
  dashboards: DashboardType[];
}): ReactNode {
  const selectedId = 0;

  return (
    <ul>
      {dashboards.map((dashboard) => {
        return (
          <li key={dashboard.id}>
            <button
              className={cn(
                `mobile:flex-center hover:bg-violet-light active:bg-violet active:*:text-gray-5 flex w-full cursor-pointer gap-2.5 rounded-sm p-3`,
                selectedId === dashboard.id && `bg-violet-light`
              )}
              onClick={() => {
                console.log('todo');
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
                <Image
                  src={'/icon/mydashboard.svg'}
                  className='h-[14px] w-[18px] self-center'
                  alt='왕관 아이콘'
                  width={16}
                  height={12}
                />
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
