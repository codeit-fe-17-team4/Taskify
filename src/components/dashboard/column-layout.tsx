import AddColumnButton from './add-column-button';
import DashboardColumn from './dashboard-column';
import type { ColumnType, TaskType } from './type';

interface ColumnLayoutProps {
  columns: ColumnType[];
  onAddColumnClick?: () => void;
  onColumnSettingsClick?: (columnId: string) => void;
  onAddTaskClick?: (columnId: string) => void;
  onTaskClick?: (task: TaskType) => void;
  maxColumns?: number;
}

export default function ColumnLayout({
  columns,
  onAddColumnClick,
  onColumnSettingsClick,
  onAddTaskClick,
  onTaskClick,
  maxColumns = 10,
}: ColumnLayoutProps) {
  return (
    <div className='column-layout-container flex h-full'>
      {/* 칼럼 목록 */}
      {columns.map((col) => {
        return (
          <div
            key={col.id}
            className='column-container flex h-full w-80 flex-shrink-0 flex-col border-r border-[#EEEEEE] px-4 py-6'
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

      {/* 칼럼 추가 버튼 (최대 개수 미달 시에만 표시) */}
      {columns.length < maxColumns && (
        <div className='add-column-container h-full w-80 flex-shrink-0 px-4 py-6'>
          <div className='mt-12'>
            <AddColumnButton onClick={onAddColumnClick} />
          </div>
        </div>
      )}
    </div>
  );
}
