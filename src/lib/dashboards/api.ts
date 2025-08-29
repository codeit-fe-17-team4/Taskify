import { BASE_API_URL } from '@/lib//constants';
import customFetch from '@/lib/custom-fetch';
import type * as i from '@/lib/dashboards/interface';
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

export const createDashBoard = async ({
  title,
  color,
}: i.CreateDashBoardParams): Promise<DashboardType> => {
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
}: i.GetDashBoardsParams): Promise<DashboardsType> => {
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
}: i.EditDashBoardParams): Promise<DashboardType> => {
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
}: i.CreateInvitationParams): Promise<InvitationType> => {
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
}: i.GetInvitationsParams): Promise<InvitationsType> => {
  const data = await customFetch(
    `${BASE_API_URL}/dashboards/${String(dashboardId)}/invitations?page=${String(page)}&size=${String(size)}`,
    invitationsSchema
  );

  return data;
};
export const deleteInvitation = async ({
  dashboardId,
  invitationId,
}: i.DeleteInvitationParams): Promise<void> => {
  await customFetch(
    `${BASE_API_URL}/dashboards/${String(dashboardId)}/invitations/${String(invitationId)}}`,
    deleteSchema,
    {
      method: 'DELETE',
    }
  );
};
