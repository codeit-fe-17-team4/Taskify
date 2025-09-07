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

  // FormData인 경우 Content-Type 헤더를 제거
  const isFormData = init?.body instanceof FormData;

  const res = await fetch(input, {
    ...init,
    headers: {
      // FormData가 아닌 경우에만 Content-Type 헤더 추가
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      // 토큰이 있으면 Authorization 헤더 추가
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();

    throw new Error(`[${String(res.status)}] ${errorText}`);
  }

  // 응답 텍스트 확인
  const responseText = await res.text();

  // 빈 응답인 경우 빈 객체 반환
  if (!responseText.trim()) {
    return {} as z.infer<T>;
  }

  // JSON 파싱 시도
  let data;
  try {
    data = JSON.parse(responseText);
  } catch (jsonError) {
    console.error('JSON 파싱 실패:', jsonError);
    console.error('응답 텍스트:', responseText);
    throw new Error('서버 응답을 파싱할 수 없습니다.');
  }

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
