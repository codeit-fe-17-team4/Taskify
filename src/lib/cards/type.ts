import z from 'zod';

export const cardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  dueDate: z.string().nullable(),
  assignee: z.object({
    profileImageUrl: z.string().nullable(),
    nickname: z.string(),
    id: z.number(),
  }),
  imageUrl: z.string().nullable(),
  teamId: z.string(),
  columnId: z.number(),
  order: z.number().optional(), // 카드 순서 필드 추가
  createdAt: z.string(),
  updatedAt: z.string(),
});
export const cardListSchema = z.object({
  cursorId: z.number().nullable(),
  totalCount: z.number(),
  cards: z.array(cardSchema),
});
export const deleteSchema = z.any().optional();

export type CardType = z.infer<typeof cardSchema>;
export type CardListType = z.infer<typeof cardListSchema>;
