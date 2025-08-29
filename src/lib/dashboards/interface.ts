export interface GetDashBoardsParams {
  navigationMethod: 'infiniteScroll' | 'pagination';
  cursorId?: number;
  page?: number;
  size?: number;
}
export interface CreateDashBoardParams {
  title: string;
  color: string;
}
export interface EditDashBoardParams {
  id: number;
  body: CreateDashBoardParams;
}
export interface CreateInvitationParams {
  id: number;
  body: {
    email: string;
  };
}
export interface GetInvitationsParams {
  dashboardId: number;
  page?: number;
  size?: number;
}
export interface DeleteInvitationParams {
  dashboardId: number;
  invitationId: number;
}
