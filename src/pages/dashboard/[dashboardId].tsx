import type { GetServerSideProps } from 'next';

/**
 * 이재준 작성 - 인증되지 않은 사용자가 대시보드 페이지에 접근할 때 로그인 페이지로 리다이렉트하기 위해 추가
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default function DashboardPage(): null {
  return null;
}
