import type { UserType } from './type';

// 토큰 저장
export const setAccessToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', token);
  }
};

// 토큰 가져오기
export const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

// 토큰 삭제
export const removeAccessToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
  }
};

// 사용자 정보 저장
export const setUser = (user: UserType): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

// 사용자 정보 가져오기
export const getUser = (): UserType | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        return null;
      }
    }
  }
  return null;
};

// 사용자 정보 삭제
export const removeUser = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

// 로그아웃 (토큰과 사용자 정보 모두 삭제)
export const logout = (): void => {
  removeAccessToken();
  removeUser();
};

// 로그인 상태 확인
export const isLoggedIn = (): boolean => {
  return getAccessToken() !== null;
};

