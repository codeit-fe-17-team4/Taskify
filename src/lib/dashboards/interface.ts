export interface GetDashBoardListParams {
  navigationMethod: 'infiniteScroll' | 'pagination';
  cursorId?: number;
  page?: number;
  size?: number;
}
export interface CreateDashBoardBody {
  title: string;
  color: string;
}
export interface EditDashBoardParams {
  id: number;
  body: CreateDashBoardBody;
}
export interface CreateInvitationParams {
  id: number;
  body: {
    email: string;
  };
}
export interface GetInvitationListParams {
  dashboardId: number;
  page?: number;
  size?: number;
}
export interface DeleteInvitationParams {
  dashboardId: number;
  invitationId: number;
}
