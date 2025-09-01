import z from 'zod';

export const memberListSchema = z.object({
  members: z.array(
    z.object({
      id: z.number(),
      userId: z.number(),
      email: z.string(),
      nickname: z.string(),
      profileImageUrl: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      isOwner: z.boolean(),
    })
  ),
  totalCount: z.number(),
});

export const deleteSchema = z.object();

export type MemberListType = z.infer<typeof memberListSchema>;
