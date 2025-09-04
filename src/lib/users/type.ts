import z from 'zod';

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  profileImageUrl: z.union([z.null(), z.string()]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const signupSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  profileImageUrl: z.union([z.null(), z.string()]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const updateMyInfoSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  profileImageUrl: z.union([z.null(), z.string()]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const uploadProfileImageSchema = z.object({
  profileImageUrl: z.string(),
});

export type UserType = z.infer<typeof userSchema>;
export type SignupType = z.infer<typeof signupSchema>;
export type UpdateMyInfoType = z.infer<typeof updateMyInfoSchema>;
export type UploadProfileImageType = z.infer<typeof uploadProfileImageSchema>;
