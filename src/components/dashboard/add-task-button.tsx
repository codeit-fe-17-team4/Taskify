import Image from 'next/image';
import type { AddTaskButtonProps } from './type';

export default function AddTaskButton({ onClick }: AddTaskButtonProps) {
  return (
    <button
      className='flex h-11 w-full flex-shrink-0 cursor-pointer items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white'
      onClick={onClick}
    >
      <Image
        src='/dashboard/add-btn.svg'
        alt='카드 추가'
        width={22}
        height={22}
      />
    </button>
  );
}
