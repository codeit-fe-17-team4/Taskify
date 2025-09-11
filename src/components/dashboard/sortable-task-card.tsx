import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ColumnTaskCard from '@/components/dashboard/column-task-card';
import type { TaskType } from '@/components/dashboard/type';
import { useTheme } from '@/contexts/ThemeContext';

interface SortableTaskCardProps {
  task: TaskType;
  onEditTask?: (task: TaskType) => void;
}

export default function SortableTaskCard({
  task,
  onEditTask,
}: SortableTaskCardProps) {
  const { theme } = useTheme();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    disabled: false,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className='group relative w-full'
    >
      <div className='w-full'>
        <ColumnTaskCard task={task} onEditTask={onEditTask} />
      </div>
      <div
        {...listeners}
        className={`absolute top-2 right-2 h-6 w-6 cursor-grab rounded opacity-0 transition-opacity group-hover:opacity-100 active:cursor-grabbing ${
          theme === 'dark' ? 'bg-[var(--auth-border)]' : 'bg-gray-200'
        }`}
      >
        <div
          className={`flex h-full w-full items-center justify-center text-xs ${
            theme === 'dark'
              ? 'text-[var(--auth-placeholder)]'
              : 'text-gray-500'
          }`}
        >
          ↕
        </div>
      </div>
    </div>
  );
}
