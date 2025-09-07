import { z } from 'zod';

/**
 * 쿠키에서 access_token을 가져오는 함수
 */
function getAccessToken(): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('access_token='))
    ?.split('=')[1];

  return token || null;
}

export default async function customFetch<T extends z.ZodType>(
  input: RequestInfo,
  schema: T,
  init?: RequestInit
): Promise<z.infer<T>> {
  // 쿠키에서 토큰 가져오기
  const accessToken = getAccessToken();

  const res = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      // 토큰이 있으면 Authorization 헤더 추가
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
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
