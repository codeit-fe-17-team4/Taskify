import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import ChipProfile from '@/components/ui/chip/chip-profile';
import { useFetch } from '@/hooks/useAsync';
import { getMemberList } from '@/lib/members/api';
import { getStringFromQuery } from '@/utils/getContextQuery';

export default function ProfileList(): ReactNode {
  const router = useRouter().query;
  const dashboardId = getStringFromQuery(router, 'dashboardId');
  const { data, loading, error } = useFetch({
    asyncFunction: () => getMemberList({ dashboardId: Number(dashboardId) }),
    deps: [dashboardId],
  });
  const maxDisplayLength = {
    desktop: 4,
    tablet: 2,
  };

  console.log(dashboardId, data);
  if (!data || error) {
    return null;
  }
  const excessNumber = data.totalCount - maxDisplayLength.desktop;

  return (
    <ul className='flex items-center **:not-first:-ml-3'>
      {data.members.slice(0, maxDisplayLength.desktop + 1).map((member) => {
        return (
          <li key={member.id}>
            <ChipProfile
              label={member.nickname.slice(0, 1)}
              size='lg'
              color='yellow'
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
