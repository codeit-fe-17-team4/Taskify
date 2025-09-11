import Image from 'next/image';
import type { TaskCardProps } from '@/components/dashboard/type';
import ChipProfile, {
  getProfileColorByIdHash,
} from '@/components/ui/chip/chip-profile';
import ChipTag from '@/components/ui/chip/chip-tag';
import { useTheme } from '@/contexts/ThemeContext';

const formatDueDate = (dueDate: string | undefined) => {
  if (!dueDate) {
    return '';
  }

  const date = new Date(dueDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${String(year)}-${month}-${day} ${hours}:${minutes}`;
};

export default function ColumnTaskCard({ task, onEditTask }: TaskCardProps) {
  const { theme } = useTheme();
  const handleCardClick = () => {
    if (onEditTask) {
      onEditTask(task);
    }
  };

  return (
    <button
      className={`flex w-full cursor-pointer flex-col gap-4 rounded-lg border p-4 ${
        theme === 'dark'
          ? 'border-[var(--auth-border)] bg-[#201f23] hover:bg-[var(--button-secondary-hover)]'
          : 'hover:bg-gray-4 border-gray-300 bg-white'
      }`}
      onClick={handleCardClick}
    >
      {/* 썸네일 */}
      {task.imageUrl &&
        task.imageUrl.trim() !== '' &&
        !(
          JSON.parse(
            localStorage.getItem('deletedImageCards') || '[]'
          ) as string[]
        ).includes(task.id) && (
          <div className='relative h-40 w-full overflow-hidden rounded-lg'>
            <Image
              fill
              src={task.imageUrl}
              alt='카드 이미지'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className='object-cover'
            />
          </div>
        )}

      {/* 본문 */}
      <div className='flex flex-col justify-between'>
        <div>
          <h3
            className={`mb-3 line-clamp-2 text-left text-base font-medium ${
              theme === 'dark'
                ? 'text-[var(--auth-text-strong)]'
                : 'text-gray-900'
            }`}
          >
            {task.title}
          </h3>

          {/* 태그들 */}
          <div className='mb-3 flex flex-wrap items-center gap-1.5'>
            {task.tags.map((tag) => {
              return (
                <ChipTag
                  key={`${tag.label}-${tag.color}`}
                  label={tag.label}
                  size='md'
                  color={
                    tag.color as 'blue' | 'pink' | 'green' | 'brown' | 'red'
                  }
                />
              );
            })}
          </div>

          {/* 날짜와 담당자 */}
          <div className='flex items-center justify-between'>
            <div
              className={`flex items-center gap-1.5 text-xs ${
                theme === 'dark'
                  ? 'text-[var(--auth-placeholder)]'
                  : 'text-gray-500'
              }`}
            >
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
                label={(task.manager.nickname || '').slice(0, 1)}
                color={getProfileColorByIdHash(Number(task.manager.id))}
                size='sm'
                profileImageUrl={task.manager.profileImageUrl}
              />
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
