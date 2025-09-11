import { useRouter } from 'next/router';
import { type ReactNode, useCallback, useEffect } from 'react';
import ChipProfile from '@/components/ui/chip/chip-profile';
import Dropdown from '@/components/ui/dropdown';

export default function HeaderProfileDropdwon({
  myNickname,
}: {
  myNickname: string;
}): ReactNode {
  const profileColor = 'yellow';
  const profileLabel = myNickname.slice(0, 1);
  const router = useRouter();

  const handleMyPageButton = useCallback(() => {
    router.push('/mypage');
  }, [router]);

  const handleMyDashboardButton = useCallback(() => {
    router.push('/mydashboard');
  }, [router]);

  const handleLogoutButton = useCallback(async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch {
      /**
       * @todo
       */
    }
    router.push('/');
  }, [router]);

  useEffect(() => {
    router.prefetch('/mypage');
    router.prefetch('/mydashboard');
  }, [router]);

  return (
    <Dropdown>
      <Dropdown.Toggle>
        <div className='mobile:pl-3 tablet:pr-8 mobile:pr-2 flex h-full cursor-pointer items-center gap-3 border-l-1 border-l-[var(--auth-border)] pr-20 pl-6 hover:bg-[var(--button-secondary-hover)] active:bg-[var(--button-secondary)]'>
          <ChipProfile label={profileLabel} size='lg' color={profileColor} />
          <span className='mobile:hidden font-medium text-[var(--auth-text-strong)]'>
            {myNickname}
          </span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.List
        additionalClassName='w-32 mobile:w-28 -top-1 mobile:-left-16'
        ariaLabel='사용자 메뉴'
      >
        <Dropdown.Item
          additionalClassName='justify-center'
          onClick={handleLogoutButton}
        >
          로그아웃
        </Dropdown.Item>
        <Dropdown.Item
          additionalClassName='justify-center'
          onClick={handleMyPageButton}
        >
          내 정보
        </Dropdown.Item>
        <Dropdown.Item
          additionalClassName='justify-center'
          onClick={handleMyDashboardButton}
        >
          내 대시보드
        </Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  );
}
