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
  onTaskReorder?: (columnId: string, taskIds: string[]) => void;
}

export default function DashboardColumn({
  column,
  onSettingsClick,
  onAddTaskClick,
  onTaskClick,
  onTaskReorder,
}: ColumnProps) {
  const handleAddTaskClick = () => {
    onAddTaskClick?.();
  };

  // 태스크 ID 배열 생성 (드래그 정렬용)
  const taskIds = column.tasks.map((task) => task.id);

  return (
    <>
      <div className='column-content tablet:min-h-0 flex h-full flex-col gap-4'>
        {/* 헤더 */}
        <ColumnHeader column={column} onSettingsClick={onSettingsClick} />

        {/* 카드 추가 버튼 */}
        <AddTaskButton onClick={handleAddTaskClick} />

        {/* 할일 보드 - 스크롤 가능한 영역 */}
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
