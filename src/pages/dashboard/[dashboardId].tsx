import { useState } from 'react';
import ColumnLayout from '@/components/dashboard/column-layout';
import CreateColumnModal from '@/components/dashboard/create-column-modal';
import ManageColumnModal from '@/components/dashboard/manage-column-modal';
import type { ColumnType, TaskType } from '@/components/dashboard/type';
import { ColumnFormData } from '@/components/dashboard/create-column-form';
import { ManageColumnFormData } from '@/components/dashboard/manage-column-form';

export default function DashboardDetailPage() {
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isManageColumnModalOpen, setIsManageColumnModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<ColumnType | null>(null);
  const mockColumns: ColumnType[] = [
    {
      id: '1',
      title: 'To do',
      tasks: [
        {
          id: 't1',
          title: '1234',
          description: '1234',
          tags: [
            { label: '프로젝트', color: 'orange' },
            { label: '백엔드', color: 'green' },
          ],
          dueDate: '2025-08-28 10:30',
          imageUrl: '',
          manager: {
            id: 'm1',
            name: 'te',
            nickname: 'te',
            profileColor: '#8B5CF6',
          },
        },
        {
          id: 't3',
          title: '123433333',
          description: '123433333',
          tags: [
            { label: '프로젝트', color: 'orange' },
            { label: '백엔드', color: 'green' },
          ],
          dueDate: '2025-08-28 10:00',
          imageUrl: '',
          manager: {
            id: 'm3',
            name: 'te',
            nickname: 'te',
            profileColor: '#8B5CF6',
          },
        },
      ],
    },
    {
      id: '2',
      title: 'On progress',
      tasks: [
        {
          id: 't2',
          title: '2222',
          description: '2222',
          tags: [{ label: '프로젝트', color: 'orange' }],
          dueDate: '2025-08-28 10:30',
          imageUrl: '',
          manager: {
            id: 'm2',
            name: 'te',
            nickname: 'te',
            profileColor: '#8B5CF6',
          },
        },
      ],
    },
    {
      id: '3',
      title: 'Done',
      tasks: [],
    },
  ];

  const handleAddColumnClick = () => {
    setIsColumnModalOpen(true);
  };

  const handleColumnSubmit = (columnData: ColumnFormData) => {
    console.log('새 컬럼 데이터:', columnData);
    setIsColumnModalOpen(false);
  };

  const handleColumnSettingsClick = (columnId: string) => {
    const column = mockColumns.find((col) => col.id === columnId);
    if (column) {
      setSelectedColumn(column);
      setIsManageColumnModalOpen(true);
    }
  };

  const handleColumnUpdate = (
    columnId: string,
    columnData: ManageColumnFormData
  ) => {
    console.log('컬럼 업데이트:', columnId, columnData);
    setIsManageColumnModalOpen(false);
  };

  const handleColumnDelete = (columnId: string) => {
    console.log('컬럼 삭제:', columnId);
    setIsManageColumnModalOpen(false);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* 사이드바 영역 */}
      <aside className='fixed top-0 left-0 z-50 h-screen w-[18.75rem] border-r border-gray-200 bg-white'>
        <div className='h-full bg-blue-100 p-4'>
          <div className='text-sm text-gray-600'>
            사이드바 영역 (18.75rem = 300px)
          </div>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <div className='ml-[18.75rem]'>
        {/* 상단 네비게이션 헤더 */}
        <header className='flex h-[4.375rem] items-center border-b border-gray-200 bg-green-100'>
          <div className='flex h-full items-center px-4'>
            <span className='text-sm text-gray-600'>
              헤더 영역 (4.375rem = 70px)
            </span>
          </div>
        </header>

        {/* 대시보드 메인 콘텐츠 */}
        <main className='layout-children h-[calc(100vh-4.375rem)] bg-gray-50'>
          <ColumnLayout
            columns={mockColumns}
            onAddColumnClick={handleAddColumnClick}
            onAddTaskClick={(columnId: string) =>
              console.log('Add task to column:', columnId)
            }
            onColumnSettingsClick={handleColumnSettingsClick}
            onTaskClick={(task: TaskType) => console.log('Task clicked:', task)}
          />
        </main>
      </div>

      {/* 컬럼 생성 모달 */}
      <CreateColumnModal
        isOpen={isColumnModalOpen}
        onClose={() => setIsColumnModalOpen(false)}
        onSubmit={handleColumnSubmit}
      />

      {/* 컬럼 관리 모달 */}
      <ManageColumnModal
        isOpen={isManageColumnModalOpen}
        onClose={() => setIsManageColumnModalOpen(false)}
        column={selectedColumn}
        onUpdate={handleColumnUpdate}
        onDelete={handleColumnDelete}
      />
    </div>
  );
}
