import z from 'zod';

export const dashboardSchema = z.object({
  id: z.number(),
  title: z.string(),
  color: z.string(),
  userId: z.number(),
  createdByMe: z.boolean(),
});
export const dashboardsSchema = z.object({
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
export const invitationsSchema = z.object({
  totalCount: z.number(),
  invitations: z.array(invitationSchema),
});
export const deleteSchema = z.object();
export type DashboardsType = z.infer<typeof dashboardsSchema>;
export type DashboardType = z.infer<typeof dashboardSchema>;
export type InvitationType = z.infer<typeof invitationSchema>;
export type InvitationsType = z.infer<typeof invitationsSchema>;
