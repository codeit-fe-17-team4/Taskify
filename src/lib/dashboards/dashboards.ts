import { BASE_API_URL } from '@/lib//constants';
import customFetch from '@/lib/custom-fetch';
import {
  dashboardSchema,
  dashboardsSchema,
  type DashboardsType,
  type DashboardType,
  deleteSchema,
  invitationSchema,
  invitationsSchema,
  type InvitationsType,
  type InvitationType,
} from '@/lib/dashboards/type';

interface GetDashBoardsParams {
  navigationMethod: 'infiniteScroll' | 'pagination';
  cursorId?: number;
  page?: number;
  size?: number;
}
interface CreateDashBoardParams {
  title: string;
  color: string;
}
interface EditDashBoardParams {
  id: number;
  body: CreateDashBoardParams;
}
interface CreateInvitationParams {
  id: number;
  body: {
    email: string;
  };
}
interface GetInvitationsParams {
  dashboardId: number;
  page?: number;
  size?: number;
}
interface DeleteInvitationParams {
  dashboardId: number;
  invitationId: number;
}
export const createDashBoard = async ({
  title,
  color,
}: CreateDashBoardParams): Promise<DashboardType> => {
  const data = await customFetch(
    `${BASE_API_URL}/dashboards`,
    dashboardSchema,
    {
      method: 'POST',
      body: JSON.stringify({
        title,
        color,
      }),
    }
  );

  return data;
};
export const getDashBoards = async ({
  navigationMethod = 'infiniteScroll',
  cursorId = 0,
  page = 1,
  size = 10,
}: GetDashBoardsParams): Promise<DashboardsType> => {
  const data = await customFetch(
    `${BASE_API_URL}/dashboards?navigationMethod=${navigationMethod}&cursorId=${String(cursorId)}&page=${String(page)}&size=${String(size)}`,
    dashboardsSchema
  );

  return data;
};

export const getDashBoard = async ({
  id,
}: {
  id: number;
}): Promise<DashboardType> => {
  const data = await customFetch(
    `${BASE_API_URL}/dashboards/${String(id)}`,
    dashboardSchema
  );

  return data;
};
export const editDashBoard = async ({
  id,
  body,
}: EditDashBoardParams): Promise<DashboardType> => {
  const { title, color } = body;
  const data = await customFetch(
    `${BASE_API_URL}/dashboards/${String(id)}`,
    dashboardSchema,
    {
      method: 'PUT',
      body: JSON.stringify({
        title,
        color,
      }),
    }
  );

  return data;
};
export const deleteDashBoard = async ({
  id,
}: {
  id: number;
}): Promise<void> => {
  await customFetch(`${BASE_API_URL}/dashboards/${String(id)}`, deleteSchema, {
    method: 'DELETE',
  });
};

export const createInvitation = async ({
  body,
  id,
}: CreateInvitationParams): Promise<InvitationType> => {
  const { email } = body;
  const data = await customFetch(
    `${BASE_API_URL}/dashboards/${String(id)}/invitations`,
    invitationSchema,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
    }
  );

  return data;
};

export const getInvitations = async ({
  dashboardId,
  page = 1,
  size = 10,
}: GetInvitationsParams): Promise<InvitationsType> => {
  const data = await customFetch(
    `${BASE_API_URL}/dashboards/${String(dashboardId)}/invitations?page=${String(page)}&size=${String(size)}`,
    invitationsSchema
  );

  return data;
};
export const deleteInvitation = async ({
  dashboardId,
  invitationId,
}: DeleteInvitationParams): Promise<void> => {
  await customFetch(
    `${BASE_API_URL}/dashboards/${String(dashboardId)}/invitations/${String(invitationId)}}`,
    deleteSchema,
    {
      method: 'DELETE',
    }
  );
};
