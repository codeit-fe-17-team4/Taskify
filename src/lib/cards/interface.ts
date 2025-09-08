export interface CreateCardParams {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate?: string;
  tags: string[];
  imageUrl?: string;
}
export interface GetCardListParams {
  size?: number;
  cursorId?: number;
  columnId: number;
}
export interface EditCardParams {
  cardId: number;
  body: UpdateCardParams;
}

export interface UpdateCardParams {
  columnId?: number;
  assigneeUserId?: number;
  title?: string;
  description?: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string;
  order?: number; // 카드 순서 필드 추가
}
