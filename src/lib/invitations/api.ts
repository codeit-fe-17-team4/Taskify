import { BASE_API_URL } from '@/lib/constants';
import customFetch from '@/lib/custom-fetch';
import type * as i from '@/lib/invitations/interface';
import * as z from '@/lib/invitations/type';

export const getInvitationList = async ({
  cursorId = 0,
  size = 10,
  title = '',
}: i.GetInvitationList): Promise<z.InvitationListType> => {
  const queryParams = new URLSearchParams({
    size: String(size),
    cursorId: String(cursorId),
    title,
  });
  const data = await customFetch(
    `${BASE_API_URL}/invitations?${queryParams}`,
    z.invitationListSchema
  );

  return data;
};
export const acceptInvitation = async ({
  invitationId,
  body,
}: i.AcceptInvitation): Promise<z.InvitationType> => {
  const data = await customFetch(
    `${BASE_API_URL}/invitations/${String(invitationId)}`,
    z.invitationSchema,
    {
      method: 'PUT',
      body: JSON.stringify({
        ...body,
      }),
    }
  );

  return data;
};
