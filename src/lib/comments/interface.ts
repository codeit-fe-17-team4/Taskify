export interface CreateCommentBody {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}
export interface GetCommentListParams {
  size?: number;
  cursorId?: number;
  cardId: number;
}
export interface EditCommentParams {
  commentId: number;
  body: {
    content: string;
  };
}
