import { useRouter } from 'next/router';
import { type ReactNode, useCallback, useEffect } from 'react';
import ChipProfile, {
  type ChipProfileProps,
} from '@/components/ui/chip/chip-profile';
import Dropdown from '@/components/ui/dropdown';

interface HeaderDropdownProps {
  nickname: string;
  profileLabel: string;
  profileColor: ChipProfileProps['color'];
}
export default function HeaderDropdown({
  nickname,
  profileLabel,
  profileColor,
}: HeaderDropdownProps): ReactNode {
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
        <div className='border-l-gray-3 hover:bg-gray-4 active:bg-gray-3 mobile:pl-3 tablet:pr-8 mobile:pr-2 flex h-full cursor-pointer items-center gap-3 border-l-1 pr-20 pl-6'>
          <ChipProfile label={profileLabel} size='lg' color={profileColor} />
          <span className='mobile:hidden font-medium'>{nickname}</span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.List
        positionClassName='top-3 right-3 w-32 mobile:w-28'
        ariaLabel='사용자 메뉴'
      >
        <Dropdown.Item onClick={handleLogoutButton}>로그아웃</Dropdown.Item>
        <Dropdown.Item onClick={handleMyPageButton}>내 정보</Dropdown.Item>
        <Dropdown.Item onClick={handleMyDashboardButton}>
          내 대시보드
        </Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  );
}
