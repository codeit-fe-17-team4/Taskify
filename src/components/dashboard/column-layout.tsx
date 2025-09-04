import type { ReactNode } from 'react';
import AddColumnButton from './add-column-button';
import DashboardColumn from './dashboard-column';
import type { ColumnType, TaskType } from './type';

interface ColumnLayoutProps {
  columns: ColumnType[];
  onAddColumnClick?: () => void;
  onColumnSettingsClick?: (columnId: string) => void;
  onAddTaskClick?: (columnId: string) => void;
  onTaskClick?: (task: TaskType) => void;
}

export default function ColumnLayout({
  columns,
  onAddColumnClick,
  onColumnSettingsClick,
  onAddTaskClick,
  onTaskClick,
}: ColumnLayoutProps): ReactNode {
  return (
    <div className='tablet:flex-col tablet:gap-2 flex h-full'>
      {/* 칼럼 목록 */}
      {columns.map((col) => {
        return (
          <div
            key={col.id}
            className='column-container tablet:w-full tablet:border-r-0 tablet:border-b tablet:border-[#EEEEEE] tablet:px-4 tablet:py-4 tablet:h-auto tablet:min-h-[300px] flex h-full w-80 flex-shrink-0 flex-col border-r border-[#EEEEEE] px-4 py-6'
          >
            <DashboardColumn
              column={col}
              onSettingsClick={() => onColumnSettingsClick?.(col.id)}
              onAddTaskClick={() => onAddTaskClick?.(col.id)}
              onTaskClick={onTaskClick}
            />
          </div>
        );
      })}

      {/* 칼럼 추가 버튼 */}
      <div className='add-column-container tablet:w-full tablet:px-4 tablet:py-4 tablet:h-auto tablet:min-h-0 h-full w-80 flex-shrink-0 px-4 py-6'>
        <div className='tablet:mt-2 mt-12'>
          <AddColumnButton onClick={onAddColumnClick} />
        </div>
      </div>
    </div>
  );
}
