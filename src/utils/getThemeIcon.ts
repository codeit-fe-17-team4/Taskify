import type { Theme } from '@/contexts/ThemeContext';

/**
 * 테마에 따라 적절한 이미지 경로를 반환하는 유틸리티 함수
 *
 * @param imageName - 이미지 이름 (확장자 제외)
 * @param theme - 현재 테마 ('light' | 'dark')
 * @returns 테마에 맞는 이미지 경로
 */
export function getThemeIcon(imageName: string, theme: Theme): string {
  const basePath = theme === 'dark' ? '/darkauth' : '/auth';

  // 이미지별 경로 매핑
  const imagePaths: Record<string, string> = {
    // 헤더 로고
    'header-logo': `${basePath}/image/header-logo.svg`,
    'logo-header': `${basePath}/image/header-logo.svg`,

    // 히어로 이미지
    'hero-desktop': `${basePath}/image/hero-desktop.svg`,

    // 로그인/회원가입 로고
    'login-signup-logo': `${basePath}/image/login-signup-logo.svg`,

    // 사이드바 로고
    logo:
      theme === 'dark' ? `${basePath}/image/logo.svg` : '/side-menu/logo.png',
    Taskify:
      theme === 'dark'
        ? `${basePath}/image/Taskify.svg`
        : '/side-menu/Taskify.svg',

    // 아이콘들
    addimage: `${basePath}/icon/addimage.svg`,
    add_box: `${basePath}/icon/add_box.svg`,
    'close-icon': `${basePath}/icon/close-icon.svg`,
    'facebook-icon': `${basePath}/icon/facebook-icon.svg`,
    'gmail-icon': `${basePath}/icon/gmail-icon.svg`,
    'instagram-icon': `${basePath}/icon/instagram-icon.svg`,
    'menu-icon': `${basePath}/icon/menu-icon.svg`,
    'visibility-off': `${basePath}/icon/visibility-off.svg`,
    visibility: `${basePath}/icon/visibility.svg`,

    // 대시보드 관련 아이콘들
    newDashboard:
      theme === 'dark'
        ? `${basePath}/icon/add_box.svg`
        : '/icon/newDashboard.svg',
    prevPage: '/icon/prevPage.svg', // 라이트/다크 동일
    nextPage: '/icon/nextPage.svg', // 라이트/다크 동일
    inviteEmpty: '/icon/inviteEmpty.svg', // 라이트/다크 동일
    search: '/icon/search.svg', // 라이트/다크 동일
    goback: '/icon/goback.svg', // 라이트/다크 동일
    selected: '/icon/selected.svg', // 라이트/다크 동일
    addmember: '/icon/addmember.svg', // 라이트/다크 동일
  };

  return imagePaths[imageName] || `${basePath}/image/${imageName}.svg`;
}
