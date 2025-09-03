import Link from 'next/link';
import type { ReactNode } from 'react';
import Button from '@/components/ui/button/button';
import ChipProfile from '@/components/ui/chip/chip-profile';
import DashboardHeader from '@/components/ui/dashboard-header';
import SideMenu from '@/components/ui/side-menu';

export default function Home(): ReactNode {
  return (
    <>
      <DashboardHeader />
      <SideMenu />
      {/* <Link href='/mydashboard'>mydashboard</Link> */}
      {/* <div className='flex-center w-lg gap-3 border-2 border-amber-500 px-1.5'>
        <Button variant='invitation' label='확인' backgroundColor='violet' />
        <Button variant='invitation' label='취소' backgroundColor='white' />
      </div>
      <div className='flex-center w-lg gap-3 border-2 border-amber-500 px-1.5'>
        <Button variant='modal' label='확인' backgroundColor='violet' />
        <Button variant='modal' label='취소' backgroundColor='white' />
      </div>
      <div className='flex-center w-lg gap-3 border-2 border-amber-500 px-1.5'>
        <ChipProfile label='K' size='md' color='green' />
        <ChipProfile label='K' size='md' color='blue' />
        <ChipProfile label='K' size='md' color='brown' />
      </div> */}
    </>
  );
}
