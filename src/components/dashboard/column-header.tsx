import Image from 'next/image';
import type { ColumnHeaderProps } from '@/components/dashboard/type';
import AnimatedNumber from '@/components/ui/animated-number';

export default function ColumnHeader({
  column,
  onSettingsClick,
}: ColumnHeaderProps) {
  return (
    <header className='flex flex-shrink-0 items-center justify-between'>
      <div className='flex items-center gap-3'>
        <div className='h-2 w-2 rounded-full bg-violet-500'></div>
        <h2 className='text-lg font-bold text-gray-800'>{column.title}</h2>
        <span className='bg-gray-4 text-gray-1 flex size-[20px] items-center justify-center rounded-[6px] text-xs'>
          <AnimatedNumber value={column.tasks.length} />
        </span>
      </div>
      <button
        className='cursor-pointer rounded p-1 transition-transform duration-200 active:rotate-90'
        onClick={onSettingsClick}
      >
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
