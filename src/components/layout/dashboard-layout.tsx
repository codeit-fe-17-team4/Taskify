import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import DashboardHeader from '@/components/ui/dashboard-header';
import SideMenu from '@/components/ui/side-menu';

const pretendardVariable = localFont({
  src: '../../../public/fonts/Pretendard/PretendardVariable.woff2',
  variable: '--font-pretendard',
  weight: '100 900',
});

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return (
    <div
      className={`${pretendardVariable.variable} font-pretendard tablet:pl-40 mobile:pl-[4rem] pt-16 pl-[18.75rem]`}
    >
      <DashboardHeader />
      <SideMenu />
      {children}
    </div>
  );
}
