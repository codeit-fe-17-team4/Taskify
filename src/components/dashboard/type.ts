export interface TagType {
  label: string;
  color: string;
}

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
  title: string;
}

export interface CreateTaskFormData {
  title: string;
  description?: string;
  assigneeId?: string;
  dueDate?: string;
  tags: string[];
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
