import { useState } from 'react';
import type {
  ColumnType,
  CreateTaskFormData,
  EditTaskFormData,
  TaskType,
} from '@/components/dashboard/type';
import { createCard, deleteCard, editCard } from '@/lib/cards/api';
import { uploadCardImage } from '@/lib/columns/api';

interface UseTaskHandlersProps {
  columns: ColumnType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnType[]>>;
  members: {
    userId: number;
    nickname: string;
    email: string;
    profileImageUrl: string | null;
  }[];
  dashboardId: number;
  getTagColorByLabel: (
    label: string
  ) => 'blue' | 'pink' | 'green' | 'brown' | 'red';
}

export const useTaskHandlers = ({
  columns,
  setColumns,
  members,
  dashboardId,
  getTagColorByLabel,
}: UseTaskHandlersProps) => {
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);

  const handleTaskClick = (task: TaskType) => {
    setSelectedTask(task);
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

      let imageUrl: string | null = taskData.existingImageUrl ?? '';

      if (taskData.imageFile) {
        try {
          const uploadResult = await uploadCardImage(
            targetColumn ? Number(targetColumn.id) : Number(selectedTask.id),
            taskData.imageFile
          );

          imageUrl = uploadResult.imageUrl;
        } catch (error) {
          imageUrl = taskData.existingImageUrl ?? '';
        }
      } else if (taskData.existingImageUrl === undefined) {
        imageUrl = null;
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

      if (taskData.dueDate) {
        updateData.dueDate = taskData.dueDate.replace('T', ' ');
      }

      updateData.imageUrl = imageUrl || undefined;

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
        imageUrl: updatedCard.imageUrl || '',
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

      setSelectedTask(null);
    } catch (error) {
      // 카드 수정 실패
    }
  };

  const handleAddTaskClick = (columnId: string) => {
    setSelectedColumnId(columnId);
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
        dashboardId,
        columnId: Number(selectedColumnId),
        title: taskData.title,
        description: taskData.description,
        tags: taskData.tags.map((tag) => tag.label),
      };

      if (taskData.dueDate) {
        // YYYY-MM-DDTHH:MM 형식을 YYYY-MM-DD HH:MM 형식으로 변환
        cardData.dueDate = taskData.dueDate.replace('T', ' ');
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

      setSelectedColumnId(null);
    } catch (error) {
      // 카드 생성 실패
    }
  };

  const handleTaskDelete = async (taskId: string) => {
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
      setSelectedTask(null);
    } catch (error) {
      // 카드 삭제 실패
    }
  };

  return {
    selectedTask,
    setSelectedTask,
    selectedColumnId,
    setSelectedColumnId,
    handleTaskClick,
    getSelectedTaskColumn,
    handleTaskEdit,
    handleTaskUpdate,
    handleAddTaskClick,
    handleCreateTask,
    handleTaskDelete,
  };
};
