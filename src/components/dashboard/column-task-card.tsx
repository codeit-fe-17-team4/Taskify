import Image from 'next/image';
import ChipProfile from '@/components/ui/chip/chip-profile';
import ChipTag from '@/components/ui/chip/chip-tag';
import { getProfileColor } from '@/utils/profile-color';
import type { TaskCardProps } from './type';

const formatDueDate = (dueDate: string) => {
  if (!dueDate) {return '';}

  const date = new Date(dueDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export default function ColumnTaskCard({ task, onEditTask }: TaskCardProps) {
  const handleCardClick = () => {
    if (onEditTask) {
      onEditTask(task);
    }
  };

  return (
    <div
      className='flex cursor-pointer flex-col gap-4 rounded-lg border border-gray-300 bg-white p-4'
      onClick={handleCardClick}
    >
      {/* 썸네일 */}
      {task.imageUrl && (
        <div className='h-40 w-full overflow-hidden rounded-lg'>
          <Image
            src={task.imageUrl}
            alt='카드 이미지'
            width={300}
            height={160}
            className='h-full w-full object-cover'
          />
        </div>
      )}

      {/* 본문 */}
      <div className='flex flex-col justify-between'>
        <div>
          <h3 className='mb-3 line-clamp-2 text-base font-medium text-gray-900'>
            {task.title}
          </h3>

          {/* 태그들 */}
          <div className='mb-3 flex flex-wrap items-center gap-1.5'>
            {task.tags.map((tag) => 
              { return <ChipTag
                key={tag.label}
                label={tag.label}
                color={tag.color as 'blue' | 'pink' | 'green' | 'brown' | 'red'}
                size='md'
              /> }
            )}
          </div>

          {/* 날짜와 담당자 */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-1.5 text-xs text-gray-500'>
              <Image
                src='/dashboard/calendar.svg'
                alt='달력'
                width={14}
                height={16}
              />
              <span>{formatDueDate(task.dueDate)}</span>
            </div>

            <div className='flex items-center'>
              <ChipProfile
                label={String(task.manager.nickname || '').slice(0, 1)}
                color={getProfileColor(task.manager.profileColor)}
                size='sm'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
