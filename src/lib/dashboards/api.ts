import { BASE_API_URL } from '@/lib/constants';
import { CustomError } from '@/lib/custom-error';
import customFetch from '@/lib/custom-fetch';
import type * as i from '@/lib/dashboards/interface';
import * as z from '@/lib/dashboards/type';

export const createDashBoard = async (
  body: i.CreateDashBoardBody
): Promise<z.DashboardType> => {
  const data = await customFetch(
    `${BASE_API_URL}/dashboards`,
    z.dashboardSchema,
    {
      method: 'POST',
      body: JSON.stringify({
        ...body,
      }),
    }
  );

  return data;
};
export const getDashBoardList = async ({
  navigationMethod = 'infiniteScroll',
  cursorId = 0,
  page = 1,
  size = 10,
}: i.GetDashBoardListParams): Promise<z.DashboardListType> => {
  const queryParams = new URLSearchParams({
    navigationMethod,
    cursorId: String(cursorId),
    page: String(page),
    size: String(size),
  });
  const data = await customFetch(
    `${BASE_API_URL}/dashboards?${queryParams}`,
    z.dashboardListSchema
  );

  return data;
};

export const getDashBoard = async (id: number): Promise<z.DashboardType> => {
  const data = await customFetch(
    `${BASE_API_URL}/dashboards/${String(id)}`,
    z.dashboardSchema
  );

  return data;
};
export const editDashBoard = async ({
  id,
  body,
}: i.EditDashBoardParams): Promise<z.DashboardType> => {
  const data = await customFetch(
    `${BASE_API_URL}/dashboards/${String(id)}`,
    z.dashboardSchema,
    {
      method: 'PUT',
      body: JSON.stringify({
        ...body,
      }),
    }
  );

  return data;
};
export const deleteDashBoard = async (id: number): Promise<void> => {
  await customFetch(
    `${BASE_API_URL}/dashboards/${String(id)}`,
    z.deleteSchema,
    {
      method: 'DELETE',
    }
  );
};

export const createInvitation = async ({
  body,
  id,
}: i.CreateInvitationParams): Promise<z.InvitationType> => {
  try {
    const data = await customFetch(
      `${BASE_API_URL}/dashboards/${String(id)}/invitations`,
      z.invitationSchema,
      {
        method: 'POST',
        body: JSON.stringify({
          ...body,
        }),
      }
    );

    return data;
  } catch (error) {
    if (error instanceof CustomError && error.status) {
      throw error;
    }
    throw error;
  }
};

export const getInvitationList = async ({
  dashboardId,
  page = 1,
  size = 10,
}: i.GetInvitationListParams): Promise<z.InvitationListType> => {
  const queryParams = new URLSearchParams({
    dashboardId: String(dashboardId),
    page: String(page),
    size: String(size),
  });
  const data = await customFetch(
    `${BASE_API_URL}/dashboards/${String(dashboardId)}/invitations?${queryParams}`,
    z.invitationListSchema
  );

  return data;
};
export const deleteInvitation = async ({
  dashboardId,
  invitationId,
}: i.DeleteInvitationParams): Promise<void> => {
  await customFetch(
    `${BASE_API_URL}/dashboards/${String(dashboardId)}/invitations/${String(invitationId)}`,
    z.deleteSchema,
    {
      method: 'DELETE',
    }
  );
};
