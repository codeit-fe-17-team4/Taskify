import { useState } from 'react';
import ColumnLayout from '@/components/dashboard/column-layout';
import CreateColumnModal from '@/components/dashboard/modal/create-column-modal';
import CreateTaskModal from '@/components/dashboard/modal/create-task-modal';
import EditTaskModal from '@/components/dashboard/modal/edit-task-modal';
import ManageColumnModal from '@/components/dashboard/modal/manage-column-modal';
import TaskDetailModal from '@/components/dashboard/modal/task-detail-modal';
import type {
  ColumnType,
  CreateColumnFormData,
  CreateTaskFormData,
  EditTaskFormData,
  ManageColumnFormData,
  TaskType,
} from '@/components/dashboard/type';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { mockColumns, mockProfileColors } from '@/lib/dashboard-mock-data';
import type { UserType } from '@/lib/users/type';

interface DashboardDetailPageProps {
  userInfo: UserType | null;
}

export default function DashboardDetailPage({
  userInfo,
}: DashboardDetailPageProps): React.ReactElement {
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isManageColumnModalOpen, setIsManageColumnModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<ColumnType | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
  const [columns, setColumns] = useState<ColumnType[]>(mockColumns);

  const handleAddColumnClick = () => {
    setIsColumnModalOpen(true);
  };

  const handleColumnSubmit = (columnData: CreateColumnFormData) => {
    const newColumn: ColumnType = {
      id: Date.now().toString(),
      title: columnData.name,
      tasks: [],
    };

    setColumns((prevColumns) => [...prevColumns, newColumn]);
    setIsColumnModalOpen(false);
  };

  const handleColumnSettingsClick = (columnId: string) => {
    const column = columns.find((col) => col.id === columnId);

    if (column) {
      setSelectedColumn(column);
      setIsManageColumnModalOpen(true);
    }
  };

  const handleColumnUpdate = (
    columnId: string,
    columnData: ManageColumnFormData
  ) => {
    setColumns((prevColumns) => {
      return prevColumns.map((col) =>
        col.id === columnId ? { ...col, title: columnData.name } : col
      );
    });
    setIsManageColumnModalOpen(false);
  };

  const handleColumnDelete = (columnId: string) => {
    setColumns((prevColumns) =>
      prevColumns.filter((col) => col.id !== columnId)
    );
    setIsManageColumnModalOpen(false);
  };

  const handleTaskClick = (task: TaskType) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const getSelectedTaskColumn = () => {
    if (!selectedTask) {
      return null;
    }

    return columns.find((col) =>
      col.tasks.some((task) => task.id === selectedTask.id)
    );
  };

  const handleTaskEdit = (task: TaskType) => {
    setSelectedTask(task);
    setIsDetailModalOpen(false);
    setIsEditTaskModalOpen(true);
  };

  const handleTaskUpdate = (taskData: EditTaskFormData) => {
    if (!selectedTask) {
      return;
    }

    const updatedTask: TaskType = {
      ...selectedTask,
      title: taskData.title,
      description: taskData.description,
      tags: taskData.tags,
      dueDate: taskData.dueDate,
      imageUrl: taskData.imageFile
        ? URL.createObjectURL(taskData.imageFile)
        : (taskData.existingImageUrl ?? ''),
      manager: {
        ...selectedTask.manager,
        name: taskData.assignee,
        nickname: taskData.assignee,
      },
    };

    const currentColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === selectedTask.id)
    );
    const targetColumn = columns.find((col) => col.title === taskData.status);

    setColumns((prevColumns) => {
      if (
        currentColumn &&
        targetColumn &&
        currentColumn.id !== targetColumn.id
      ) {
        return prevColumns.map((col) => {
          if (col.id === currentColumn.id) {
            return {
              ...col,
              tasks: col.tasks.filter((task) => task.id !== selectedTask.id),
            };
          }
          if (col.id === targetColumn.id) {
            return {
              ...col,
              tasks: [...col.tasks, updatedTask],
            };
          }

          return col;
        });
      }

      return prevColumns.map((col) => {
        return {
          ...col,
          tasks: col.tasks.map((task) =>
            task.id === selectedTask.id ? updatedTask : task
          ),
        };
      });
    });

    setIsEditTaskModalOpen(false);
    setSelectedTask(null);
  };

  const handleAddTaskClick = (columnId: string) => {
    setSelectedColumnId(columnId);
    setIsCreateTaskModalOpen(true);
  };

  const handleCreateTask = (taskData: CreateTaskFormData) => {
    if (!selectedColumnId) {
      return;
    }

    const newTask: TaskType = {
      id: `task_${String(Date.now())}_${Math.random().toString(36).slice(2, 11)}`,
      title: taskData.title,
      description: taskData.description,
      tags: taskData.tags,
      dueDate: taskData.dueDate,
      imageUrl: taskData.imageFile
        ? URL.createObjectURL(taskData.imageFile)
        : '',
      manager: {
        id: 'm1',
        name: taskData.assignee,
        nickname: taskData.assignee,
        profileColor: mockProfileColors[0],
      },
    };

    setColumns((prevColumns) => {
      return prevColumns.map((col) => {
        return col.id === selectedColumnId
          ? { ...col, tasks: [...col.tasks, newTask] }
          : col;
      });
    });
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* 대시보드 메인 콘텐츠 */}
      <main className='h-screen bg-gray-50'>
        <ColumnLayout
          columns={columns}
          maxColumns={10}
          onAddColumnClick={handleAddColumnClick}
          onColumnSettingsClick={handleColumnSettingsClick}
          onTaskClick={handleTaskClick}
          onAddTaskClick={handleAddTaskClick}
        />
      </main>

      {/* 컬럼 생성 모달 */}
      <CreateColumnModal
        isOpen={isColumnModalOpen}
        existingColumns={columns.map((col) => col.title)}
        maxColumns={10}
        onSubmit={handleColumnSubmit}
        onClose={() => {
          setIsColumnModalOpen(false);
        }}
      />

      {/* 태스크 생성 모달 */}
      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        userInfo={userInfo}
        onSubmit={handleCreateTask}
        onClose={() => {
          setIsCreateTaskModalOpen(false);
          setSelectedColumnId(null);
        }}
      />

      {/* 컬럼 관리 모달 */}
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

      {/* 할일 상세 모달 */}
      <TaskDetailModal
        isOpen={isDetailModalOpen}
        task={selectedTask}
        columnTitle={getSelectedTaskColumn()?.title}
        currentUser={{
          id: String(userInfo?.id ?? 'user-1'),
          name: userInfo?.nickname ?? '사용자',
          profileColor: mockProfileColors[1],
        }}
        onEdit={handleTaskEdit}
        onClose={() => {
          setIsDetailModalOpen(false);
        }}
        onDelete={(taskId) => {
          setColumns((prevColumns) => {
            return prevColumns.map((col) => {
              return {
                ...col,
                tasks: col.tasks.filter((task) => task.id !== taskId),
              };
            });
          });
          setIsDetailModalOpen(false);
          setSelectedTask(null);
        }}
      />

      {/* 할일 수정 모달 */}
      <EditTaskModal
        isOpen={isEditTaskModalOpen}
        initialTask={selectedTask ?? undefined}
        columns={columns.map((col) => ({ id: col.id, title: col.title }))}
        currentColumnTitle={getSelectedTaskColumn()?.title ?? undefined}
        userInfo={userInfo}
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
