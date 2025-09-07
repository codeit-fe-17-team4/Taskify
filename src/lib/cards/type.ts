import z from 'zod';

export const cardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  dueDate: z.string(),
  assignee: z.object({
    profileImageUrl: z.union([z.string(), z.null()]),
    nickname: z.string(),
    id: z.number(),
  }),
  imageUrl: z.string(),
  teamId: z.string(),
  columnId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export const cardListSchema = z.object({
  cursorId: z.number(),
  totalCount: z.number(),
  cards: z.array(cardSchema),
});
export const deleteSchema = z.object();

export type CardType = z.infer<typeof cardSchema>;
export type CardListType = z.infer<typeof cardListSchema>;
