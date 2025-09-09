import type { chipTagColor } from '@/components/ui/chip/chip-tag';

export interface TagType {
  label: string;
  color: chipTagColor;
}

export const TAG_COLORS = ['blue', 'pink', 'green', 'brown', 'red'] as const;

/**
 * 랜덤 태그 색상 선택 함수
 */
export const getRandomTagColor = (): chipTagColor => {
  const randomIndex = Math.floor(Math.random() * TAG_COLORS.length);

  return TAG_COLORS[randomIndex];
};

export interface TaskType {
  id: string;
  title: string;
  description?: string;
  tags: TagType[];
  dueDate?: string;
  imageUrl?: string;
  manager: {
    id: string;
    name: string;
    nickname: string;
    profileColor: string;
    profileImageUrl?: string | null;
  };
}

export interface ColumnType {
  id: string;
  title: string;
  tasks: TaskType[];
}

export interface DashboardType {
  id: string;
  name: string;
  columns: ColumnType[];
}

// 컴포넌트 Props 타입
export interface ColumnHeaderProps {
  column: ColumnType;
  onSettingsClick?: () => void;
}

export interface TaskCardProps {
  task: TaskType;
  onEditTask?: (task: TaskType) => void;
  onDeleteTask?: (taskId: string) => void;
}

export interface AddColumnButtonProps {
  onClick?: () => void;
}

export interface AddTaskButtonProps {
  onClick?: () => void;
}

// 폼 관련 타입
export interface CreateColumnFormData {
  name: string;
}

export interface ManageColumnFormData {
  name: string;
}

export interface CreateTaskFormData {
  assignee: string;
  title: string;
  description: string;
  dueDate: string;
  tags: TagType[];
  imageFile: File | null;
}

export interface EditTaskFormData {
  status: string;
  assignee: string;
  title: string;
  description: string;
  dueDate: string;
  tags: TagType[];
  imageFile: File | null;
  existingImageUrl?: string;
}

// 모달 상태 타입
export interface ColumnModalState {
  isOpen: boolean;
  mode: 'create' | 'edit';
  columnId?: string;
  initialTitle?: string;
}

export interface TaskModalState {
  isOpen: boolean;
  mode: 'create' | 'edit';
  columnId?: string;
  task?: TaskType;
}

// 댓글 타입
export interface CommentType {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    profileColor: string;
  };
  createdAt: string;
}

// 할일 상세 모달 Props
export interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskType | null;
  columnTitle?: string;
  dashboardId?: string;
  columnId?: string;
  currentUser?: {
    id: string;
    name: string;
    profileColor: string;
  };
  onEdit?: (task: TaskType) => void;
  onDelete?: (taskId: string) => void;
}
