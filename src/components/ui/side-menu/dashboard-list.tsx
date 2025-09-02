import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export default function DashboardList(): ReactNode {
  const selectedId = 0;

  return (
    <ul>
      {Array(10)
        .fill('')
        .map((num, i) => {
          return (
            <li key={crypto.randomUUID()}>
              <button
                className={cn(
                  `mobile:flex-center flex w-full cursor-pointer gap-2.5 rounded-sm p-3`,
                  selectedId === i && `bg-violet-light`
                )}
                onClick={() => {
                  console.log('todo');
                }}
              >
                <Image
                  src={'/icon/dot/dot4.svg'}
                  alt='초록색 점'
                  className='h-auto w-auto'
                  width={8}
                  height={8}
                />
                <div className='mobile:hidden flex gap-1.5'>
                  <span className='text-2lg font-medium'>코드잇</span>
                  <Image
                    src={'/icon/mydashboard.svg'}
                    className='h-auto w-auto'
                    alt='왕관 아이콘'
                    width={18}
                    height={14}
                  />
                </div>
              </button>
            </li>
          );
        })}
    </ul>
  );
}
