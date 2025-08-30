import Link from 'next/link';
import type { ReactNode } from 'react';

export default function Home(): ReactNode {
  return (
    <div>
      <Link href='/mydashboard'>mydashboard</Link>
    </div>
  );
}