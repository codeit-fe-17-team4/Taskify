import CardSkeleton from '@/components/dashboard/skeleton/card';

export default function ColumnSkeleton() {
  return (
    <div className='flex h-full overflow-scroll'>
      {Array(5)
        .fill(0)
        .map((_, _i) => {
          return (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={_i}
              className='flex h-full w-80 flex-shrink-0 flex-col px-4 py-6'
            >
              <div className='tablet:min-h-0 flex h-full flex-col gap-4'>
                <div className='skeleton h-8 w-full' />
                <div className='skeleton h-11 w-full' />
                <div className='scrollbar-hide flex-1 overflow-y-auto'>
                  <div className='flex w-full flex-col gap-4'>
                    {Array(3)
                      .fill(0)
                      .map((__, __i) => {
                        // eslint-disable-next-line react/no-array-index-key
                        return <CardSkeleton key={__i} />;
                      })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
