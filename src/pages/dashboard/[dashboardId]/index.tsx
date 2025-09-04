import { type ReactNode, useState } from 'react';
import ColumnLayout from '@/components/dashboard/column-layout';
import CreateColumnModal from '@/components/dashboard/create-column-modal';
import EditTaskModal from '@/components/dashboard/edit-task-modal';
import ManageColumnModal from '@/components/dashboard/manage-column-modal';
import TaskDetailModal from '@/components/dashboard/task-detail-modal';
import type { ColumnType, TaskType } from '@/components/dashboard/type';
import DashboardHeader from '@/components/ui/dashboard-header';
import SideMenu from '@/components/ui/side-menu';

export default function DashboardDetailPage(): ReactNode {
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isManageColumnModalOpen, setIsManageColumnModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<ColumnType | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const mockColumns: ColumnType[] = [
    {
      id: '1',
      title: 'To do',
      tasks: [
        {
          id: 't1',
          title: '새로운 일정 관리 Taskify',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          tags: [
            { label: '프로젝트', color: 'orange' },
            { label: '백엔드', color: 'green' },
          ],
          dueDate: '2025-08-28 10:30',
          imageUrl: '/dashboard/sample-image.png',
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

  const handleColumnSubmit = () => {
    // TODO: 컬럼 생성 API 호출
    setIsColumnModalOpen(false);
  };

  const handleColumnSettingsClick = (columnId: string) => {
    const column = mockColumns.find((col) => col.id === columnId);

    if (column) {
      setSelectedColumn(column);
      setIsManageColumnModalOpen(true);
    }
  };

  const handleColumnUpdate = () => {
    // TODO: 컬럼 업데이트 API 호출
    setIsManageColumnModalOpen(false);
  };

  const handleColumnDelete = () => {
    // TODO: 컬럼 삭제 API 호출
    setIsManageColumnModalOpen(false);
  };

  const handleTaskClick = (task: TaskType) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const handleTaskEdit = (task: TaskType) => {
    setSelectedTask(task);
    setIsDetailModalOpen(false);
    setIsEditTaskModalOpen(true);
  };

  const handleTaskUpdate = () => {
    // TODO: 태스크 업데이트 API 호출
    setIsEditTaskModalOpen(false);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* 사이드바 */}
      <SideMenu />

      {/* 메인 콘텐츠 */}
      <div className='tablet:pl-[10rem] mobile:pl-[4rem] pt-16 pl-[18.75rem]'>
        {/* 상단 네비게이션 헤더 */}
        <DashboardHeader />

        {/* 대시보드 메인 콘텐츠 */}
        <main className='layout-children tablet:overflow-x-hidden tablet:overflow-y-auto h-[calc(100vh-4.375rem)] bg-gray-50'>
          <ColumnLayout
            columns={mockColumns}
            onAddColumnClick={handleAddColumnClick}
            onColumnSettingsClick={handleColumnSettingsClick}
            onTaskClick={handleTaskClick}
            onAddTaskClick={() => {
              // TODO: 태스크 생성 모달 열기
            }}
          />
        </main>
      </div>

      {/* 컬럼 생성 모달 */}
      <CreateColumnModal
        isOpen={isColumnModalOpen}
        onSubmit={handleColumnSubmit}
        onClose={() => {
          setIsColumnModalOpen(false);
        }}
      />

      {/* 컬럼 관리 모달 */}
      <ManageColumnModal
        isOpen={isManageColumnModalOpen}
        column={selectedColumn}
        onUpdate={handleColumnUpdate}
        onDelete={handleColumnDelete}
        onClose={() => {
          setIsManageColumnModalOpen(false);
        }}
      />

      {/* 할일 상세 모달 */}
      <TaskDetailModal
        isOpen={isDetailModalOpen}
        task={selectedTask}
        onEdit={handleTaskEdit}
        onClose={() => {
          setIsDetailModalOpen(false);
        }}
        onDelete={() => {
          // TODO: 태스크 삭제 API 호출
        }}
      />

      {/* 할일 수정 모달 */}
      <EditTaskModal
        isOpen={isEditTaskModalOpen}
        initialTask={selectedTask ?? undefined}
        onSubmit={handleTaskUpdate}
        onClose={() => {
          setIsEditTaskModalOpen(false);
        }}
      />
    </div>
  );
}
