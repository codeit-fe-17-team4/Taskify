import z from 'zod';

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  profileImageUrl: z.union([z.null(), z.string()]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const loginSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
});

export const changePasswordSchema = z.object({});

export type UserType = z.infer<typeof userSchema>;
export type LoginType = z.infer<typeof loginSchema>;
