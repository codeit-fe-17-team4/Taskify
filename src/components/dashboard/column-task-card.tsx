import Image from 'next/image';
import type { TaskCardProps } from './type';

const getTagColorClasses = (color: string) => {
  switch (color) {
    case 'orange':
      return 'bg-orange-100 text-orange-600';
    case 'green':
      return 'bg-green-100 text-green-600';
    case 'blue':
      return 'bg-blue-100 text-blue-600';
    case 'red':
      return 'bg-red-100 text-red-600';
    case 'purple':
      return 'bg-purple-100 text-purple-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export default function ColumnTaskCard({ task }: TaskCardProps) {
  return (
    <div className='cursor-pointer rounded-lg border border-gray-300 bg-white'>
      {/* 이미지 */}
      {task.imageUrl && (
        <div className='h-40 w-full overflow-hidden rounded-t-lg'>
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
      <div className='p-4'>
        <h3 className='mb-3 line-clamp-2 text-base font-medium text-gray-900'>
          {task.title}
        </h3>

        {/* 태그들 */}
        <div className='mb-3 flex flex-wrap gap-1.5'>
          {task.tags.map((tag) => (
            <span
              key={tag.label}
              className={`rounded-md px-2 py-1 text-xs font-medium ${getTagColorClasses(tag.color)}`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        <div className='flex items-center justify-between'>
          {/* 날짜 */}
          <div className='flex items-center gap-1.5 text-xs text-gray-500'>
            <Image
              src='/image/calendar.svg'
              alt='달력'
              width={14}
              height={16}
            />
            <span>{task.dueDate}</span>
          </div>

          {/* 담당자 */}
          <div className='flex items-center'>
            <div
              className='flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium text-white'
              style={{ backgroundColor: task.manager.profileColor }}
            >
              {task.manager.nickname.slice(0, 2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
