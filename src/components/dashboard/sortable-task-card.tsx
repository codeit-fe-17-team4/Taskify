import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { TaskType } from '@/components/dashboard/type';
import ColumnTaskCard from './column-task-card';

interface SortableTaskCardProps {
  task: TaskType;
  onEditTask?: (task: TaskType) => void;
}

export default function SortableTaskCard({
  task,
  onEditTask,
}: SortableTaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    // 위아래 드래그만 허용 (vertical only)
    disabled: false,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    // 드래그 중일 때 z-index 높이기
    zIndex: isDragging ? 1000 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className='relative w-full'
    >
      <div className='w-full'>
        <ColumnTaskCard task={task} onEditTask={onEditTask} />
      </div>
      {/* 드래그 핸들 - 위아래 화살표로 변경 */}
      <div
        {...listeners}
        className='absolute top-2 right-2 h-6 w-6 cursor-grab rounded bg-gray-200 opacity-0 transition-opacity hover:opacity-100 active:cursor-grabbing'
        title='드래그하여 순서 변경 (위아래)'
      >
        <div className='flex h-full w-full items-center justify-center text-xs text-gray-500'>
          ↕
        </div>
      </div>
    </div>
  );
}
