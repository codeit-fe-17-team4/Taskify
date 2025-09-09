import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import AddTaskButton from '@/components/dashboard/add-task-button';
import ColumnHeader from '@/components/dashboard/column-header';
import SortableTaskCard from '@/components/dashboard/sortable-task-card';
import type { ColumnType, TaskType } from '@/components/dashboard/type';

interface ColumnProps {
  column: ColumnType;
  onSettingsClick?: () => void;
  onAddTaskClick?: () => void;
  onTaskClick?: (task: TaskType) => void;
}

export default function DashboardColumn({
  column,
  onSettingsClick,
  onAddTaskClick,
  onTaskClick,
}: ColumnProps) {
  const handleAddTaskClick = () => {
    onAddTaskClick?.();
  };

  const taskIds = column.tasks.map((task) => task.id);

  return (
    <>
      <div className='column-content tablet:min-h-0 flex h-full flex-col gap-4'>
        <ColumnHeader column={column} onSettingsClick={onSettingsClick} />

        <AddTaskButton onClick={handleAddTaskClick} />

        <div className='scrollbar-hide flex-1 overflow-y-auto'>
          <SortableContext
            items={taskIds}
            strategy={verticalListSortingStrategy}
          >
            <div className='flex w-full flex-col gap-4'>
              {column.tasks.map((task) => {
                return (
                  <SortableTaskCard
                    key={task.id}
                    task={task}
                    onEditTask={onTaskClick}
                  />
                );
              })}
            </div>
          </SortableContext>
        </div>
      </div>
    </>
  );
}
