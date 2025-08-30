import z from 'zod';

export const dashboardSchema = z.object({
  id: z.number(),
  title: z.string(),
  color: z.string(),
  userId: z.number(),
  createdByMe: z.boolean(),
});
export const dashboardListSchema = z.object({
  cursorId: z.number(),
  totalCount: z.number(),
  dashboards: z.array(dashboardSchema),
});
export const invitationSchema = z.object({
  id: z.number(),
  inviter: {
    nickname: z.string(),
    email: z.string(),
    id: z.number(),
  },
  teamId: z.string(),
  dashboard: {
    title: z.string(),
    id: z.number(),
  },
  invitee: {
    nickname: z.string(),
    email: z.string(),
    id: z.number(),
  },
  inviteAccepted: z.boolean(),
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
