import type * as i from '@/lib/comments/interface';
import * as z from '@/lib/comments/type';
import { TEAM_ID } from '@/lib/constants';
import customFetch from '@/lib/custom-fetch';

const COMMENTS_API_URL = 'https://sp-taskify-api.vercel.app';

export const createComment = async (
  body: i.CreateCommentBody
): Promise<z.CommentType> => {
  const data = await customFetch(
    `${COMMENTS_API_URL}/${TEAM_ID}/comments`,
    z.commentSchema,
    {
      method: 'POST',
      body: JSON.stringify({
        content: body.content,
        cardId: body.cardId,
        columnId: body.columnId,
        dashboardId: body.dashboardId,
      }),
    }
  );

  return data;
};

export const getCommentList = async ({
  size = 10,
  cursorId,
  cardId,
}: i.GetCommentListParams): Promise<z.CommentListType> => {
  const queryParams = new URLSearchParams({
    size: String(size),
    cardId: String(cardId),
  });

  if (cursorId && cursorId > 0) {
    queryParams.append('cursorId', String(cursorId));
  }

  const data = await customFetch(
    `${COMMENTS_API_URL}/${TEAM_ID}/comments?${queryParams}`,
    z.commentListSchema
  );

  return data;
};

export const editComment = async ({
  commentId,
  body,
}: i.EditCommentParams): Promise<z.CommentType> => {
  const data = await customFetch(
    `${COMMENTS_API_URL}/${TEAM_ID}/comments/${String(commentId)}`,
    z.commentSchema,
    {
      method: 'PUT',
      body: JSON.stringify({
        ...body,
      }),
    }
  );

  return data;
};

export const deleteComment = async (commentId: number): Promise<void> => {
  await customFetch(
    `${COMMENTS_API_URL}/${TEAM_ID}/comments/${String(commentId)}`,
    z.deleteSchema,
    {
      method: 'DELETE',
    }
  );
};
