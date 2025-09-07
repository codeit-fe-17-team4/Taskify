import z from 'zod';

export const commentSchema = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  cardId: z.number(),
  author: z.object({
    profileImageUrl: z.string().nullable(),
    nickname: z.string(),
    id: z.number(),
  }),
});
export const commentListSchema = z.object({
  cursorId: z.number().nullable(),
  comments: z.array(commentSchema),
});
export const deleteSchema = z.object();

export type CommentListType = z.infer<typeof commentListSchema>;
export type CommentType = z.infer<typeof commentSchema>;
