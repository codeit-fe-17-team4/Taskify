import { type NextRequest, NextResponse } from 'next/server';

const LOGIN_PATH = '/login';
const DASHBOARD_PATH = '/dashboard';
const MYDASHBOARD_PATH = '/mydashboard';

export function middleware(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // 보호된 경로들
  const protectedPaths = [MYDASHBOARD_PATH, '/mypage', DASHBOARD_PATH];
  // 인증 페이지들(로그인/회원가입)
  const authPages = [LOGIN_PATH, '/signup'];

  // 현재 경로가 보호된 경로인지 확인
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  const accessToken = request.cookies.get('access_token');

  // 이미 로그인된 사용자가 로그인/회원가입 페이지 접근 시 대시보드로 보냄
  const isAuthPage = authPages.some((path) => pathname.startsWith(path));

  if (isAuthPage && accessToken) {
    const dashUrl = new URL(MYDASHBOARD_PATH, request.url);

    return NextResponse.redirect(dashUrl);
  }

  if (isProtectedPath && !accessToken) {
    // 쿠키가 없으면 로그인 페이지로 리다이렉트 (next 파라미터 없이)
    const loginUrl = new URL(LOGIN_PATH, request.url);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: [
//     MYDASHBOARD_PATH,
//     `${MYDASHBOARD_PATH}/:path*`,
//     '/mypage',
//     '/mypage/:path*',
//     DASHBOARD_PATH,
//     `${DASHBOARD_PATH}/:path*`,
//     LOGIN_PATH,
//     '/signup',
//   ],
// };
