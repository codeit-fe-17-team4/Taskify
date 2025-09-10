import type { ReactNode } from 'react';
import ChipProfile, {
  getProfileColorByIdHash,
} from '@/components/ui/chip/chip-profile';
import { useFetch } from '@/hooks/useAsync';
import useIsBreakPoint from '@/hooks/useIsBreakPoint';
import { getMemberList } from '@/lib/members/api';

export default function ProfileList({
  dashboardId,
  myId,
}: {
  dashboardId: string;
  myId: number;
}): ReactNode {
  const { data, error } = useFetch({
    asyncFunction: () => getMemberList({ dashboardId: Number(dashboardId) }),
    deps: [dashboardId],
  });
  const tabletBreakPointAsRem = 80;
  const isTablet = useIsBreakPoint(tabletBreakPointAsRem);

  if (!data || error) {
    return null;
  }
  const maxDisplayLength = isTablet ? 2 : 4;
  const excessNumber = data.totalCount - maxDisplayLength;

  return (
    <ul className='flex items-center **:not-first:-ml-3'>
      {data.members.slice(0, maxDisplayLength).map((member) => {
        if (member.userId === myId) {
          return;
        }

        return (
          <li key={member.id}>
            <ChipProfile
              label={member.nickname.slice(0, 1)}
              size='lg'
              color={getProfileColorByIdHash(member.userId)}
            />
          </li>
        );
      })}
      {excessNumber > 0 && (
        <li>
          <ChipProfile
            label={`+${String(excessNumber)}`}
            size='lg'
            color='red'
          />
        </li>
      )}
    </ul>
  );
}
