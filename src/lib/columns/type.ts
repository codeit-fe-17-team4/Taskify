import z from 'zod';

export const columnSchema = z.object({
  id: z.number(),
  title: z.string(),
  teamId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export const columnListSchema = z.object({
  result: z.string(),
  data: z.array(columnSchema),
});
export const imageSchema = z.object({
  imageUrl: z.string(),
});
export const deleteSchema = z.object();

export type ColumnType = z.infer<typeof columnSchema>;
export type ColumnListType = z.infer<typeof columnListSchema>;
export type ImageType = z.infer<typeof imageSchema>;
