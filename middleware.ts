import { type NextRequest , NextResponse } from 'next/server';


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 보호된 경로들
  const protectedPaths = ['/mydashboard', '/mypage', '/dashboard'];

  // 현재 경로가 보호된 경로인지 확인
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedPath) {
    // access_token 쿠키 확인
    const accessToken = request.cookies.get('access_token');

    if (!accessToken) {
      // 쿠키가 없으면 로그인 페이지로 리다이렉트
      const loginUrl = new URL('/login', request.url);

      loginUrl.searchParams.set('next', pathname);

      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/mydashboard',
    '/mydashboard/:path*',
    '/mypage',
    '/mypage/:path*',
    '/dashboard',
    '/dashboard/:path*',
  ],
};
