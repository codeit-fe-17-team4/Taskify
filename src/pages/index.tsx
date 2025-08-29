import Link from 'next/link';
import type { ReactNode } from 'react';

export default function Home(): ReactNode {
  return (
    <div>
      <Link href='/mydashboard'>mydashboard</Link>
      <br />
      <Link href='/mydashboard/invite-list'>invite-list</Link>
    </div>
  );
}
