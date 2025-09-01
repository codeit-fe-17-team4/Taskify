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
      console.error('API 응답 검증 실패:', error.issues);
      throw new TypeError(
        `서버 응답 형식이 올바르지 않습니다: ${JSON.stringify(error.issues)}`
      );
    }
    throw error;
  }
}
