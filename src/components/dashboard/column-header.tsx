import Image from 'next/image';
import type { ColumnHeaderProps } from './type';

export default function ColumnHeader({
  column,
  onSettingsClick,
}: ColumnHeaderProps) {
  return (
    <header className='flex items-center justify-between'>
      <div className='flex items-center gap-3'>
        <div className='h-2 w-2 rounded-full bg-violet-500'></div>
        <h2 className='text-lg font-bold text-gray-800'>{column.title}</h2>
        <span className='flex min-w-[24px] items-center justify-center rounded-md bg-gray-200 px-2 py-1 text-center text-sm font-medium text-gray-500'>
          {column.tasks.length}
        </span>
      </div>
      <button className='cursor-pointer rounded p-1' onClick={onSettingsClick}>
        <Image
          src='/dashboard/column-setting-icon.svg'
          alt='컬럼 설정'
          width={24}
          height={24}
          className='opacity-70'
        />
      </button>
    </header>
  );
}
