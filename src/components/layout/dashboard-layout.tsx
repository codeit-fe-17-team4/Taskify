import type { ReactNode } from 'react';
import DashboardHeader from '@/components/ui/dashboard-header';
import SideMenu from '@/components/ui/side-menu';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return (
    <div className='pt-16 pl-[18.75rem]'>
      <DashboardHeader />
      <SideMenu />
      {children}
    </div>
  );
}
