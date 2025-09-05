import AddTaskButton from './add-task-button';
import ColumnHeader from './column-header';
import ColumnTaskCard from './column-task-card';
import type { ColumnType, TaskType } from './type';

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

  return (
    <>
      <div className='column-content tablet:min-h-0 flex h-full flex-col gap-4'>
        {/* 헤더 */}
        <ColumnHeader column={column} onSettingsClick={onSettingsClick} />

        {/* 카드 추가 버튼 */}
        <AddTaskButton onClick={handleAddTaskClick} />

        {/* 할일 보드 - 스크롤 가능한 영역 */}
        <div className='scrollbar-hide flex-1 overflow-y-auto'>
          <div className='flex flex-col gap-4'>
            {column.tasks.map((task) => 
              { return <ColumnTaskCard
                key={task.id}
                task={task}
                onEditTask={onTaskClick}
              /> }
            )}
          </div>
        </div>
      </div>
    </>
  );
}
