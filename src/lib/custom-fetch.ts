import { z } from 'zod';

export default async function customFetch<T extends z.ZodType>(
  input: RequestInfo,
  schema: T,
  init?: RequestInit
): Promise<z.infer<T>> {
  const res = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();

    throw new Error(`[${String(res.status)}] ${errorText}`);
  }
  const data = await res.json();

  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new TypeError(
        `Response validation failed: ${JSON.stringify(error.issues)}`
      );
    }
    throw error;
  }
}
