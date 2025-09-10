import { z } from 'zod';

export const parseSchema = z.object({
  message: z.string(),
});

export type parseType = z.infer<typeof parseSchema>;
// eslint-disable-next-line no-restricted-syntax/noClasses
export class CustomError extends Error {
  constructor(
    message?: string,
    public status?: number,

    public details?: parseType
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}
