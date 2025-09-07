import type { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
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
  getRandomTagColor,
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
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * 태그 라벨을 기반으로 일관된 색상 할당
   */
  const getTagColorByLabel = (
    label: string
  ): 'blue' | 'pink' | 'green' | 'brown' | 'red' => {
    const hash = label
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return TAG_COLORS[hash % TAG_COLORS.length];
  };

  /**
   * dueDate 형식 변환 함수
   */
  const formatDueDate = (dateString: string): string | null => {
    if (!dateString || dateString.trim() === '') {
      return null;
    }

    // 이미 YYYY-MM-DD HH:MM 형식인지 확인
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(dateString)) {
      return dateString;
    }

    // YYYY-MM-DD 형식을 YYYY-MM-DD HH:MM으로 변환
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return `${dateString} 00:00`;
    }

    // Date 객체를 YYYY-MM-DD HH:MM 형식으로 변환
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return null;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // 데이터 로딩
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // 컬럼 목록 로드
        const columnsData = await getColumnList(Number(dashboardId));
        const columnsWithTasks = await Promise.all(
          columnsData.data.map(async (column) => {
            const cardsData = await getCardList({
              columnId: column.id,
              size: 100, // 모든 카드 로드
            });

            return {
              id: String(column.id),
              title: column.title,
              tasks: cardsData.cards.map((card) => {
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
                  dueDate: card.dueDate,
                  imageUrl: card.imageUrl || '',
                  manager: {
                    id: String(card.assignee.id),
                    name: card.assignee.nickname,
                    nickname: card.assignee.nickname,
                    profileColor: '#7AC555',
                  },
                };
              }),
            };
          })
        );

        setColumns(columnsWithTasks);

        // 멤버 목록 로드
        const membersData = await getMemberList({
          dashboardId: Number(dashboardId),
          size: 100,
        });

        setMembers(membersData.members);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
        // 기본 컬럼 설정 (테스트용으로 더 많은 컬럼 추가)
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
      // 멤버에서 assignee 찾기
      const assigneeMember = members.find((member) => {
        return (
          member.nickname === taskData.assignee ||
          member.email === taskData.assignee
        );
      });

      // 타겟 컬럼 찾기
      const targetColumn = columns.find((col) => col.title === taskData.status);

      // 이미지 업로드 처리
      let imageUrl = taskData.existingImageUrl ?? '';

      if (taskData.imageFile) {
        try {
          const uploadResult = await uploadCardImage(
            targetColumn ? Number(targetColumn.id) : Number(selectedTask.id),
            taskData.imageFile
          );

          imageUrl = uploadResult.imageUrl;
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          // 이미지 업로드 실패 시 기존 이미지 URL 사용
          imageUrl = taskData.existingImageUrl ?? '';
        }
      } else if (taskData.existingImageUrl === undefined) {
        // 이미지가 삭제된 경우 (existingImageUrl이 undefined)
        imageUrl = ''; // 빈 문자열로 다시 시도
      }

      const updateData: any = {
        columnId: targetColumn
          ? Number(targetColumn.id)
          : Number(selectedTask.id),
        assigneeUserId: assigneeMember?.userId || 1,
        title: taskData.title,
        description: taskData.description,
        tags: taskData.tags.map((tag) => tag.label),
      };

      // dueDate가 있을 때만 추가
      const formattedDueDate = formatDueDate(taskData.dueDate);

      if (formattedDueDate) {
        updateData.dueDate = formattedDueDate;
      }

      // 이미지 삭제는 서버에서 처리하지 않고 클라이언트에서만 처리

      // imageUrl이 있을 때만 포함 (빈 문자열이면 필드 제외)
      if (imageUrl) {
        updateData.imageUrl = imageUrl;
      }

      console.log('카드 수정 데이터:', {
        cardId: Number(selectedTask.id),
        updateData,
        imageUrl,
        imageDeleted: taskData.existingImageUrl === undefined,
        note: '이미지 삭제는 클라이언트 사이드에서만 처리됩니다.',
      });

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
        dueDate: updatedCard.dueDate,
        // 이미지 삭제된 경우 빈 문자열로 설정
        imageUrl:
          taskData.existingImageUrl === undefined
            ? ''
            : updatedCard.imageUrl || '',
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
      // 멤버에서 assignee 찾기
      const assigneeMember = members.find((member) => {
        return (
          member.nickname === taskData.assignee ||
          member.email === taskData.assignee
        );
      });

      // 이미지 업로드 처리
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
          // 이미지 업로드 실패 시 빈 문자열 사용
          imageUrl = '';
        }
      }

      const cardData: any = {
        assigneeUserId: assigneeMember?.userId || 1, // 기본값
        dashboardId: Number(dashboardId),
        columnId: Number(selectedColumnId),
        title: taskData.title,
        description: taskData.description,
        tags: taskData.tags.map((tag) => tag.label),
      };

      // dueDate가 있을 때만 추가
      const formattedDueDate = formatDueDate(taskData.dueDate);

      if (formattedDueDate) {
        cardData.dueDate = formattedDueDate;
      }

      // imageUrl이 있을 때만 포함 (빈 문자열이면 필드 제외)
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
        dueDate: newCard.dueDate,
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
    <div className='min-h-screen overflow-y-hidden bg-gray-50'>
      {/* 대시보드 메인 콘텐츠 */}
      <main
        className='horizontal-scroll-only h-screen bg-gray-50'
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollbarWidth: 'thin',
          msOverflowStyle: 'auto',
        }}
      >
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
        members={members}
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

      {/* 할일 수정 모달 */}
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
