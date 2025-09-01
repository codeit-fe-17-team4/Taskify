import Button from '@/components/ui/button';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function Home(): ReactNode {
  return (
    <div>
      <Link href='/mydashboard'>mydashboard</Link>
      <div className='flex-center w-lg gap-3 border-2 border-amber-500 px-1.5'>
        <Button variant='invitation' label='확인' backgroundColor='violet' />
        <Button variant='invitation' label='취소' backgroundColor='white' />
      </div>
      <div className='flex-center w-lg gap-3 border-2 border-amber-500 px-1.5'>
        <Button variant='modal' label='확인' backgroundColor='violet' />
        <Button variant='modal' label='취소' backgroundColor='white' />
      </div>
      <div className='flex-center w-lg gap-3 border-2 border-amber-500 px-1.5'>
        <Button variant='primary' label='확인' backgroundColor='violet' />
        <Button variant='primary' label='취소' backgroundColor='white' />
      </div>
    </div>
  );
}
