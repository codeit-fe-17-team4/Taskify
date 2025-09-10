import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from '@dnd-kit/core';
import ColumnLayout from '@/components/dashboard/column-layout';
import CreateColumnModal from '@/components/dashboard/modal/create-column-modal';
import CreateTaskModal from '@/components/dashboard/modal/create-task-modal';
import EditTaskModal from '@/components/dashboard/modal/edit-task-modal';
import ManageColumnModal from '@/components/dashboard/modal/manage-column-modal';
import TaskDetailModal from '@/components/dashboard/modal/task-detail-modal';
import {
  type ColumnType,
  type CreateColumnFormData,
  type ManageColumnFormData,
  TAG_COLORS,
  type TaskType,
} from '@/components/dashboard/type';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { useDashboardData } from '@/hooks/useDashboardData';
import { useTaskHandlers } from '@/hooks/useTaskHandlers';
import { getCardList } from '@/lib/cards/api';
import { createColumn, deleteColumn, editColumn } from '@/lib/columns/api';
import type { UserType } from '@/lib/users/type';
import { getStringFromQuery } from '@/utils/getContextQuery';

interface DashboardDetailPageProps {
  userInfo: UserType | null;
  dashboardId: string;
}

export default function DashboardDetailPage({
  userInfo,
  // dashboardId,
}: DashboardDetailPageProps): React.ReactElement {
  const router = useRouter();
  const dashboardId = Number(getStringFromQuery(router.query, 'dashboardId'));
  /**
   * ===== 유틸리티 함수 =====
   */
  const getTagColorByLabel = useCallback(
    (label: string): 'blue' | 'pink' | 'green' | 'brown' | 'red' => {
      const hash = [...label].reduce(
        (acc, char) => acc + char.charCodeAt(0),
        0
      );

      return TAG_COLORS[hash % TAG_COLORS.length];
    },
    []
  );

  /**
   * ===== 카드 순서 관리 =====
   */
  const saveCardOrder = (columnId: string, taskIds: string[]) => {
    const orderKey = `card-order-${dashboardId}-${columnId}`;

    localStorage.setItem(orderKey, JSON.stringify(taskIds));
  };

  // ===== 데이터 로딩 =====
  const { columns, setColumns, members, isLoading } = useDashboardData({
    dashboardId,
    getCardList,
  });

  // ===== 태스크 핸들러 =====
  const {
    selectedTask,
    handleTaskClick,
    getSelectedTaskColumn,
    handleTaskEdit,
    handleTaskUpdate,
    handleAddTaskClick,
    handleCreateTask,
    handleTaskDelete,
  } = useTaskHandlers({
    columns,
    setColumns,
    members,
    dashboardId,
    getTagColorByLabel,
  });

  // ===== 모달 상태 =====
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isManageColumnModalOpen, setIsManageColumnModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<ColumnType | null>(null);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  /**
   * ===== 드래그 앤 드롭 핸들러 =====
   */
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const taskId = active.id as string;

    for (const column of columns) {
      const task = column.tasks.find((t) => t.id === taskId);

      if (task) {
        setActiveTask(task);
        break;
      }
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setActiveTask(null);

      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === activeId)
    );
    const overColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === overId)
    );

    if (activeColumn && overColumn && activeColumn.id === overColumn.id) {
      const activeIndex = activeColumn.tasks.findIndex(
        (task) => task.id === activeId
      );
      const overIndex = overColumn.tasks.findIndex(
        (task) => task.id === overId
      );

      if (activeIndex !== overIndex) {
        const newTasks = [...activeColumn.tasks];
        const [removed] = newTasks.splice(activeIndex, 1);

        newTasks.splice(overIndex, 0, removed);

        setColumns((prevColumns) => {
          return prevColumns.map((col) => {
            return col.id === activeColumn.id
              ? { ...col, tasks: newTasks }
              : col;
          });
        });

        const newTaskIds = newTasks.map((task) => task.id);

        saveCardOrder(activeColumn.id, newTaskIds);
      }
    }

    setActiveTask(null);
  };

  /**
   * ===== 컬럼 관련 핸들러 =====
   */
  const handleAddColumnClick = () => {
    setIsColumnModalOpen(true);
  };

  const handleColumnSubmit = async (columnData: CreateColumnFormData) => {
    try {
      const newColumn = await createColumn({
        title: columnData.name,
        dashboardId: Number(dashboardId),
      });

      const columnWithTasks: ColumnType = {
        id: String(newColumn.id),
        title: newColumn.title,
        tasks: [],
      };

      setColumns((prevColumns) => [...prevColumns, columnWithTasks]);
      setIsColumnModalOpen(false);
    } catch {
      // 컬럼 생성 실패
    }
  };

  const handleColumnSettingsClick = (columnId: string) => {
    const column = columns.find((col) => col.id === columnId);

    if (column) {
      setSelectedColumn(column);
      setIsManageColumnModalOpen(true);
    }
  };

  const handleColumnUpdate = async (
    columnId: string,
    columnData: ManageColumnFormData
  ) => {
    try {
      await editColumn({
        columnId: Number(columnId),
        body: { title: columnData.name },
      });

      setColumns((prevColumns) => {
        return prevColumns.map((col) =>
          col.id === columnId ? { ...col, title: columnData.name } : col
        );
      });
      setIsManageColumnModalOpen(false);
    } catch {
      // 컬럼 수정 실패
    }
  };

  const handleColumnDelete = async (columnId: string) => {
    try {
      await deleteColumn(Number(columnId));

      setColumns((prevColumns) =>
        prevColumns.filter((col) => col.id !== columnId)
      );
      setIsManageColumnModalOpen(false);
    } catch {
      // 컬럼 삭제 실패
    }
  };

  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        <div className='text-lg'>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <main
        className='horizontal-scroll-only h-screen bg-gray-50'
        style={{
          overflowX: 'auto',
          scrollbarWidth: 'thin',
          msOverflowStyle: 'auto',
        }}
      >
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <ColumnLayout
            columns={columns}
            maxColumns={10}
            onAddColumnClick={handleAddColumnClick}
            onColumnSettingsClick={handleColumnSettingsClick}
            onTaskClick={(task) => {
              handleTaskClick(task);
              setIsDetailModalOpen(true);
            }}
            onAddTaskClick={(columnId) => {
              handleAddTaskClick(columnId);
              setIsCreateTaskModalOpen(true);
            }}
          />
          <DragOverlay>
            {activeTask ? (
              <div className='rotate-3 opacity-90'>
                <div className='w-80 rounded-lg border border-gray-300 bg-white p-4 shadow-lg'>
                  <h3 className='font-medium text-gray-900'>
                    {activeTask.title}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    {activeTask.description}
                  </p>
                </div>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>

      <CreateColumnModal
        isOpen={isColumnModalOpen}
        existingColumns={columns.map((col) => col.title)}
        maxColumns={10}
        onSubmit={handleColumnSubmit}
        onClose={() => {
          setIsColumnModalOpen(false);
        }}
      />

      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        userInfo={userInfo}
        members={members}
        onSubmit={handleCreateTask}
        onClose={() => {
          setIsCreateTaskModalOpen(false);
        }}
      />

      <ManageColumnModal
        isOpen={isManageColumnModalOpen}
        column={selectedColumn}
        existingColumns={columns.map((col) => col.title)}
        onUpdate={handleColumnUpdate}
        onDelete={handleColumnDelete}
        onClose={() => {
          setIsManageColumnModalOpen(false);
        }}
      />

      <TaskDetailModal
        isOpen={isDetailModalOpen}
        task={selectedTask}
        columnTitle={getSelectedTaskColumn()?.title}
        dashboardId={dashboardId}
        columnId={getSelectedTaskColumn()?.id}
        currentUser={{
          id: String(userInfo?.id ?? 'user-1'),
          name: userInfo?.nickname ?? '사용자',
          profileColor: '#7AC555',
        }}
        onDelete={handleTaskDelete}
        onEdit={(task) => {
          handleTaskEdit(task);
          setIsDetailModalOpen(false);
          setIsEditTaskModalOpen(true);
        }}
        onClose={() => {
          setIsDetailModalOpen(false);
        }}
      />

      <EditTaskModal
        isOpen={isEditTaskModalOpen}
        initialTask={selectedTask ?? undefined}
        columns={columns.map((col) => ({ id: col.id, title: col.title }))}
        currentColumnTitle={getSelectedTaskColumn()?.title ?? undefined}
        userInfo={userInfo}
        members={members}
        onSubmit={handleTaskUpdate}
        onClose={() => {
          setIsEditTaskModalOpen(false);
        }}
      />
    </div>
  );
}

DashboardDetailPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
