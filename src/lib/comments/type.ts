import z from 'zod';

export const commentSchema = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  cardId: z.number(),
  author: z.object({
    profileImageUrl: z.union([z.string(), z.null()]),
    nickname: z.string(),
    id: z.number(),
  }),
});
export const commentListSchema = z.object({
  cursorId: z.union([z.number(), z.null()]),
  comments: z.array(commentSchema),
});
export const deleteSchema = z.object();

export type CommentListType = z.infer<typeof commentListSchema>;
export type CommentType = z.infer<typeof commentSchema>;
