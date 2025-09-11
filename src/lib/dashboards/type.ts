import z from 'zod';

export const dashboardSchema = z.object({
  id: z.number(),
  title: z.string(),
  color: z.string(),
  userId: z.number(),
  createdByMe: z.boolean(),
});
export const dashboardListSchema = z.object({
  cursorId: z.union([z.number(), z.null()]),
  totalCount: z.number(),
  dashboards: z.array(dashboardSchema),
});
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
  inviteAccepted: z.boolean().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export const invitationListSchema = z.object({
  totalCount: z.number(),
  invitations: z.array(invitationSchema),
});
export const deleteSchema = z.object();
export type DashboardListType = z.infer<typeof dashboardListSchema>;
export type DashboardType = z.infer<typeof dashboardSchema>;
export type InvitationType = z.infer<typeof invitationSchema>;
export type InvitationListType = z.infer<typeof invitationListSchema>;
