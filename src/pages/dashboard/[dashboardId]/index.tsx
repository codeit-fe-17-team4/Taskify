import type { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
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
  type CreateTaskFormData,
  type EditTaskFormData,
  type ManageColumnFormData,
  TAG_COLORS,
  type TaskType,
} from '@/components/dashboard/type';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { createCard, deleteCard, editCard, getCardList } from '@/lib/cards/api';
import {
  createColumn,
  deleteColumn,
  editColumn,
  getColumnList,
  uploadCardImage,
} from '@/lib/columns/api';
import { getMemberList } from '@/lib/members/api';
import type { UserType } from '@/lib/users/type';

interface DashboardDetailPageProps {
  userInfo: UserType | null;
  dashboardId: string;
}

export default function DashboardDetailPage({
  userInfo,
  dashboardId,
}: DashboardDetailPageProps): React.ReactElement {
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [isManageColumnModalOpen, setIsManageColumnModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<ColumnType | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [members, setMembers] = useState<
    {
      userId: number;
      nickname: string;
      email: string;
      profileImageUrl: string | null;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  const getTagColorByLabel = (
    label: string
  ): 'blue' | 'pink' | 'green' | 'brown' | 'red' => {
    const hash = [...label].reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return TAG_COLORS[hash % TAG_COLORS.length];
  };

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

  const saveCardOrder = (columnId: string, taskIds: string[]) => {
    const orderKey = `card-order-${dashboardId}-${columnId}`;

    localStorage.setItem(orderKey, JSON.stringify(taskIds));
  };

  const getCardOrder = (columnId: string): string[] | null => {
    const orderKey = `card-order-${dashboardId}-${columnId}`;
    const saved = localStorage.getItem(orderKey);

    return saved ? (JSON.parse(saved) as string[]) : null;
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

  const formatDueDate = (dateString: string): string | null => {
    if (!dateString || dateString.trim() === '') {
      return null;
    }

    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(dateString)) {
      return dateString;
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return `${dateString} 00:00`;
    }
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return null;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${String(year)}-${month}-${day} ${hours}:${minutes}`;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        const columnsData = await getColumnList(Number(dashboardId));
        const columnsWithTasks = await Promise.all(
          columnsData.data.map(async (column) => {
            const cardsData = await getCardList({
              columnId: column.id,
              size: 100,
            });

            const cardTasks = cardsData.cards.map((card) => {
              return {
                id: String(card.id),
                title: card.title,
                description: card.description,
                tags: card.tags.map((tag) => {
                  return {
                    label: tag,
                    color: getTagColorByLabel(tag),
                  };
                }),
                dueDate: card.dueDate || undefined,
                imageUrl: card.imageUrl || '',
                manager: {
                  id: String(card.assignee.id),
                  name: card.assignee.nickname,
                  nickname: card.assignee.nickname,
                  profileColor: '#7AC555',
                  profileImageUrl: card.assignee.profileImageUrl,
                },
              };
            });

            return {
              id: String(column.id),
              title: column.title,
              tasks: cardTasks,
            };
          })
        );

        setColumns(columnsWithTasks);

        const membersData = await getMemberList({
          dashboardId: Number(dashboardId),
          size: 100,
        });

        setMembers(membersData.members);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
        setColumns([
          { id: '1', title: 'To do', tasks: [] },
          { id: '2', title: 'On progress', tasks: [] },
          { id: '3', title: 'Done', tasks: [] },
          { id: '4', title: 'Review', tasks: [] },
          { id: '5', title: 'Testing', tasks: [] },
          { id: '6', title: 'Deploy', tasks: [] },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dashboardId]);

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
    } catch (error) {
      console.error('컬럼 생성 실패:', error);
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
    } catch (error) {
      console.error('컬럼 수정 실패:', error);
    }
  };

  const handleColumnDelete = async (columnId: string) => {
    try {
      await deleteColumn(Number(columnId));

      setColumns((prevColumns) =>
        prevColumns.filter((col) => col.id !== columnId)
      );
      setIsManageColumnModalOpen(false);
    } catch (error) {
      console.error('컬럼 삭제 실패:', error);
    }
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

  const handleTaskUpdate = async (taskData: EditTaskFormData) => {
    if (!selectedTask) {
      return;
    }

    try {
      const assigneeMember = members.find((member) => {
        return (
          member.nickname === taskData.assignee ||
          member.email === taskData.assignee
        );
      });

      const targetColumn = columns.find((col) => col.title === taskData.status);

      let imageUrl = taskData.existingImageUrl ?? '';
      let isImageDeleted = false;

      if (taskData.imageFile) {
        try {
          const uploadResult = await uploadCardImage(
            targetColumn ? Number(targetColumn.id) : Number(selectedTask.id),
            taskData.imageFile
          );

          imageUrl = uploadResult.imageUrl;
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          imageUrl = taskData.existingImageUrl ?? '';
        }
      } else if (taskData.existingImageUrl === undefined) {
        imageUrl = '';
        isImageDeleted = true;
      }

      const updateData: {
        columnId: number;
        assigneeUserId: number;
        title: string;
        description: string;
        tags: string[];
        dueDate?: string;
        imageUrl?: string;
      } = {
        columnId: targetColumn
          ? Number(targetColumn.id)
          : Number(selectedTask.id),
        assigneeUserId: assigneeMember?.userId ?? 1,
        title: taskData.title,
        description: taskData.description,
        tags: taskData.tags.map((tag) => tag.label),
      };

      const formattedDueDate = formatDueDate(taskData.dueDate);

      if (formattedDueDate) {
        updateData.dueDate = formattedDueDate;
      }

      if (isImageDeleted) {
        const deletedImageCards = JSON.parse(
          localStorage.getItem('deletedImageCards') || '[]'
        ) as string[];

        if (!deletedImageCards.includes(selectedTask.id)) {
          deletedImageCards.push(selectedTask.id);
          localStorage.setItem(
            'deletedImageCards',
            JSON.stringify(deletedImageCards)
          );
        }
        const { imageUrl: _, ...updateDataWithoutImage } = updateData;

        Object.assign(updateData, updateDataWithoutImage);
      } else if (imageUrl && imageUrl.trim() !== '') {
        updateData.imageUrl = imageUrl;
      }

      const updatedCard = await editCard({
        cardId: Number(selectedTask.id),
        body: updateData,
      });

      const updatedTask: TaskType = {
        id: String(updatedCard.id),
        title: updatedCard.title,
        description: updatedCard.description,
        tags: updatedCard.tags.map((tag) => {
          return {
            label: tag,
            color: getTagColorByLabel(tag),
          };
        }),
        dueDate: updatedCard.dueDate || undefined,
        imageUrl: isImageDeleted ? '' : updatedCard.imageUrl || '',
        manager: {
          id: String(updatedCard.assignee.id),
          name: updatedCard.assignee.nickname,
          nickname: updatedCard.assignee.nickname,
          profileColor: '#7AC555',
        },
      };

      const currentColumn = columns.find((col) =>
        col.tasks.some((task) => task.id === selectedTask.id)
      );

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
    } catch (error) {
      console.error('카드 수정 실패:', error);
    }
  };

  const handleAddTaskClick = (columnId: string) => {
    setSelectedColumnId(columnId);
    setIsCreateTaskModalOpen(true);
  };

  const handleCreateTask = async (taskData: CreateTaskFormData) => {
    if (!selectedColumnId) {
      return;
    }

    try {
      const assigneeMember = members.find((member) => {
        return (
          member.nickname === taskData.assignee ||
          member.email === taskData.assignee
        );
      });

      let imageUrl = '';

      if (taskData.imageFile) {
        try {
          const uploadResult = await uploadCardImage(
            Number(selectedColumnId),
            taskData.imageFile
          );

          imageUrl = uploadResult.imageUrl;
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          imageUrl = '';
        }
      }

      const cardData: {
        assigneeUserId: number;
        dashboardId: number;
        columnId: number;
        title: string;
        description: string;
        tags: string[];
        dueDate?: string;
        imageUrl?: string;
      } = {
        assigneeUserId: assigneeMember?.userId ?? 1,
        dashboardId: Number(dashboardId),
        columnId: Number(selectedColumnId),
        title: taskData.title,
        description: taskData.description,
        tags: taskData.tags.map((tag) => tag.label),
      };

      const formattedDueDate = formatDueDate(taskData.dueDate);

      if (formattedDueDate) {
        cardData.dueDate = formattedDueDate;
      }

      if (imageUrl) {
        cardData.imageUrl = imageUrl;
      }

      const newCard = await createCard(cardData);

      const newTask: TaskType = {
        id: String(newCard.id),
        title: newCard.title,
        description: newCard.description,
        tags: newCard.tags.map((tag) => {
          return {
            label: tag,
            color: getTagColorByLabel(tag),
          };
        }),
        dueDate: newCard.dueDate || undefined,
        imageUrl: newCard.imageUrl || '',
        manager: {
          id: String(newCard.assignee.id),
          name: newCard.assignee.nickname,
          nickname: newCard.assignee.nickname,
          profileColor: '#7AC555',
        },
      };

      setColumns((prevColumns) => {
        return prevColumns.map((col) => {
          return col.id === selectedColumnId
            ? { ...col, tasks: [...col.tasks, newTask] }
            : col;
        });
      });

      setIsCreateTaskModalOpen(false);
    } catch (error) {
      console.error('카드 생성 실패:', error);
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
            onTaskClick={handleTaskClick}
            onAddTaskClick={handleAddTaskClick}
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
          setSelectedColumnId(null);
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
        onEdit={handleTaskEdit}
        onClose={() => {
          setIsDetailModalOpen(false);
        }}
        onDelete={async (taskId) => {
          try {
            await deleteCard(Number(taskId));

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
          } catch (error) {
            console.error('카드 삭제 실패:', error);
          }
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, params } = context;
  const dashboardId = params?.dashboardId as string;

  const accessToken = req.cookies.access_token;
  const isAuthenticated = Boolean(accessToken);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  let userInfo = null;

  try {
    const response = await fetch(`/api/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${String(accessToken)}`,
      },
    });

    if (response.ok) {
      userInfo = await response.json();
    }
  } catch {
    // 서버에서 사용자 정보 조회 실패 시 기본값 사용
  }

  return {
    props: {
      userInfo,
      dashboardId,
    },
  };
};

DashboardDetailPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
