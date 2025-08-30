// import type { InferGetServerSidePropsType } from 'next';
import type { ReactNode } from 'react';

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
  return <div>home</div>;
}

// export default function Home(): ReactNode {
//   return <div className='flex-center'>Home</div>;
// }
