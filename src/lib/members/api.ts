import { BASE_API_URL } from '@/lib//constants';
import customFetch from '@/lib/custom-fetch';
import type * as i from '@/lib/members/interface';
import * as z from '@/lib/members/type';

export const getMemberList = async ({
  page = 1,
  size = 20,
  dashboardId,
}: i.GetMemberListParams): Promise<z.MemberListType> => {
  const queryParams = new URLSearchParams({
    page: String(page),
    size: String(size),
    dashboardId: String(dashboardId),
  });
  const data = await customFetch(
    `${BASE_API_URL}/members?${queryParams}`,
    z.memberListSchema
  );

  return data;
};
export const deleteMember = async (memberId: number): Promise<void> => {
  await customFetch(
    `${BASE_API_URL}/members/${String(memberId)}`,
    z.deleteSchema,
    {
      method: 'DELETE',
    }
  );
};
