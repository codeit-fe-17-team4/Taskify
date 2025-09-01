import { useRouter } from 'next/router';

export default function DashboardPage() {
  const router = useRouter();
  const { dashboardId } = router.query;

  return (
    <div className='bg-auth flex min-h-screen items-center justify-center'>
      <div className='text-center'>
        <h1 className='text-strong mb-[16px] text-[32px] leading-[40px] font-[600]'>
          Dashboard
        </h1>
        <p className='mb-[24px] text-[18px] leading-[26px] text-[var(--auth-placeholder)]'>
          대시보드 ID: {dashboardId}
        </p>
        <p className='text-[16px] leading-[24px] text-[var(--auth-text-strong)]'>
          이 페이지는 동적 라우팅으로 생성되었습니다
        </p>
      </div>
    </div>
  );
}
