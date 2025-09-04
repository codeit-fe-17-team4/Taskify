import Image from 'next/image';
import ChipProfile from '@/components/ui/chip/chip-profile';
import ChipTag from '@/components/ui/chip/chip-tag';
import type { TaskCardProps } from './type';

const getTagColor = (color: string): 'blue' | 'pink' | 'green' | 'brown' => {
  switch (color) {
    case 'orange': {
      return 'brown';
    }
    case 'green': {
      return 'green';
    }
    case 'blue': {
      return 'blue';
    }
    case 'red': {
      return 'pink';
    }
    case 'purple': {
      return 'pink';
    }
    default: {
      return 'blue';
    }
  }
};

export default function ColumnTaskCard({ task, onEditTask }: TaskCardProps) {
  const handleCardClick = () => {
    if (onEditTask) {
      onEditTask(task);
    }
  };

  return (
    <div
      className='tablet:flex tablet:p-4 cursor-pointer rounded-lg border border-gray-300 bg-white p-4'
      onClick={handleCardClick}
    >
      {/* 이미지 - 모바일에서는 위에, 태블릿에서는 좌측에 배치 */}
      {task.imageUrl && (
        <div className='tablet:mr-4 tablet:flex-shrink-0 tablet:w-20 tablet:h-20 tablet:overflow-hidden tablet:rounded-lg tablet:mb-0 mb-4'>
          <div className='tablet:h-full h-40 w-full overflow-hidden rounded-lg'>
            <Image
              priority
              src={task.imageUrl}
              alt='카드 이미지'
              width={300}
              height={160}
              className='h-full w-full object-cover'
            />
          </div>
        </div>
      )}

      {/* 본문 - 모바일에서는 세로, 태블릿에서는 우측에 배치 */}
      <div className='tablet:flex-1 tablet:p-0'>
        <h3 className='mb-3 line-clamp-2 text-base font-medium text-gray-900'>
          {task.title}
        </h3>

        {/* 태그들 */}
        <div className='mb-3 flex flex-wrap gap-1.5'>
          {task.tags.map((tag) => (
            <ChipTag
              key={tag.label}
              label={tag.label}
              color={getTagColor(tag.color)}
              size='md'
            />
          ))}
        </div>

        <div className='flex items-center justify-between'>
          {/* 날짜 */}
          <div className='flex items-center gap-1.5 text-xs text-gray-500'>
            <Image
              src='/dashboard/calendar.svg'
              alt='달력'
              width={14}
              height={16}
            />
            <span>{task.dueDate}</span>
          </div>

          {/* 담당자 */}
          <div className='flex items-center'>
            <ChipProfile
              label={task.manager.nickname.slice(0, 2)}
              size='sm'
              color='green'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
