// import type { InferGetServerSidePropsType } from 'next';
import type { ReactNode } from 'react';
import { getDashBoards } from '@/lib/dashboards/dashboards';

// interface ReturnInterface {
//   props: { dashboards: DashboardsType };
// }
// export const getServerSideProps = async (): Promise<ReturnInterface> => {
//   const dashboards = await getDashBoards({
//     navigationMethod: 'infiniteScroll',
//     page: 1,
//     size: 10,
//   });

//   return {
//     props: { dashboards },
//   };
// };

export default function Home(): ReactNode {
  const handleDashBoard = async () => {
    const data = await getDashBoards({
      navigationMethod: 'infiniteScroll',
    });

    console.log(data);
  };

  return (
    <>
      <button className='block' onClick={handleDashBoard}>
        대쉬보드
      </button>
    </>
  );
}

// export default function Home(): ReactNode {
//   return <div className='flex-center'>Home</div>;
// }
