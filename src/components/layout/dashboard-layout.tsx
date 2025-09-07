import type { ReactNode } from 'react';
import DashboardHeader from '@/components/ui/dashboard-header';
import SideMenu from '@/components/ui/side-menu';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return (
    <div className='tablet:pl-40 mobile:pl-[4rem] pt-16 pl-[18.75rem]'>
      <DashboardHeader />
      <SideMenu />
      {children}
    </div>
  );
}
