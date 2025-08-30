import { BASE_API_URL } from '@/lib//constants';
import type * as i from '@/lib/comments/interface';
import * as z from '@/lib/comments/type';
import customFetch from '@/lib/custom-fetch';

export const createComment = async (
  body: i.CreateCommentBody
): Promise<z.CommentType> => {
  const data = await customFetch(`${BASE_API_URL}/comments`, z.commentSchema, {
    method: 'POST',
    body: JSON.stringify({
      ...body,
    }),
  });

  return data;
};

export const getCommentList = async ({
  size = 10,
  cursorId = 0,
  cardId,
}: i.GetCommentListParams): Promise<z.CommentListType> => {
  const queryParams = new URLSearchParams({
    size: String(size),
    cardId: String(cardId),
    cursorId: String(cursorId),
  });
  const data = await customFetch(
    `${BASE_API_URL}/comments?${queryParams}`,
    z.commentListSchema
  );

  return data;
};

export const editComment = async ({
  commentId,
  body,
}: i.EditCommentParams): Promise<z.CommentType> => {
  const data = await customFetch(
    `${BASE_API_URL}/comments/${String(commentId)}`,
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
    `${BASE_API_URL}/comments/${String(commentId)}`,
    z.deleteSchema,
    {
      method: 'DELETE',
    }
  );
};
