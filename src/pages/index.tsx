import Link from 'next/link';
import type { ReactNode } from 'react';

export default function Home(): ReactNode {
  return (
    <div>
      <Link href='/mydashboard'>로그인 후 이동</Link>
    </div>
  );
}
