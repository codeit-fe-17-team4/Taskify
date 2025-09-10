import z from 'zod';

export const invitationSchema = z.object({
  id: z.number(),
  inviter: z.object({
    nickname: z.string(),
    email: z.string(),
    id: z.number(),
  }),
  teamId: z.string(),
  dashboard: z.object({
    title: z.string(),
    id: z.number(),
  }),
  invitee: z.object({
    nickname: z.string(),
    email: z.string(),
    id: z.number(),
  }),
  inviteAccepted: z.union([z.boolean(), z.null()]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const invitationListSchema = z.object({
  cursorId: z.union([z.number(), z.null()]),
  invitations: z.array(invitationSchema),
});
export type InvitationType = z.infer<typeof invitationSchema>;
export type InvitationListType = z.infer<typeof invitationListSchema>;
