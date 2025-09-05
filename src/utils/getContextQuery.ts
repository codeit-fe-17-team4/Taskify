import type { ParsedUrlQuery } from 'node:querystring';
/**
 * 쿼리 파라미터에서 숫자 ID를 안정적인 타입으로 추출합니다
 */
export function getNumberFromQuery(
  query: ParsedUrlQuery,
  key: string
): number | null {
  const value = query[key];

  if (!value || Array.isArray(value)) {
    return null;
  }
  const num = parseInt(value, 10);

  return Number.isNaN(num) ? null : num;
}

/**
 * 쿼리 파라미터에서 문자열을 안정적인 타입으로 추출합니다
 */
export function getStringFromQuery(
  query: ParsedUrlQuery,
  key: string
): string | null {
  const value = query[key];

  return typeof value === 'string' ? value : null;
}
