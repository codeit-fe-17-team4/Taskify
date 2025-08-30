export interface CreateColumnsParams {
  title: string;
  dashboardId: number;
}
export interface EditColumnParams {
  columnId: number;
  body: { title: string };
}
