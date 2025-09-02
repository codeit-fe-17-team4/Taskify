import { useState } from 'react';
import ColumnHeader from './column-header';
import AddTaskButton from './add-task-button';
import ColumnTaskCard from './column-task-card';
import CreateTaskModal from './create-task-modal';
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTaskClick = () => {
    setIsModalOpen(true);
    onAddTaskClick?.();
  };

  const handleTaskSubmit = (taskData: any) => {
    console.log('새 태스크 데이터:', taskData);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='column-content flex h-full flex-col gap-4 overflow-y-auto'>
        {/* 헤더 */}
        <ColumnHeader column={column} onSettingsClick={onSettingsClick} />

        {/* 카드 추가 버튼 */}
        <AddTaskButton onClick={handleAddTaskClick} />

        {/* 할일 보드 */}
        {column.tasks.map((task) => (
          <ColumnTaskCard key={task.id} task={task} onEditTask={onTaskClick} />
        ))}
      </div>

      {/* 카드 추가 모달 */}
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleTaskSubmit}
      />
    </>
  );
}
