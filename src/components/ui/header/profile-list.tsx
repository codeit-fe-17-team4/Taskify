import type { ReactNode } from 'react';
import ChipProfile from '@/components/ui/chip/chip-profile';

export default function ProfileList(): ReactNode {
  return (
    <ul className='flex items-center **:not-first:-ml-3'>
      {Array(2)
        .fill('0')
        .map((num: number) => {
          return (
            <li key={`${crypto.randomUUID()}-${String(num)}`}>
              <ChipProfile label={'Y'} size='lg' color='yellow' />
            </li>
          );
        })}
      <li>
        <ChipProfile label={`+${String(2)}`} size='lg' color='red' />
      </li>
    </ul>
  );
}
