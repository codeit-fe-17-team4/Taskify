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
