export default function CardSkeleton() {
  return (
    <>
      <div className='skeleton flex h-[18rem] w-full flex-col items-start justify-center gap-4 p-4'>
        <div className='skeleton bg-gray-3 h-40 w-full rounded-lg'></div>
        <div className='flex w-full flex-col items-start justify-between gap-3'>
          <div className='skeleton bg-gray-3 h-[1.625rem] w-40' />
          <div className='flex gap-1.5'>
            <span className='skeleton bg-gray-3 h-[1.56rem] w-8 rounded-sm' />
            <span className='skeleton bg-gray-3 h-[1.56rem] w-8 rounded-sm' />
            <span className='skeleton bg-gray-3 h-[1.56rem] w-8 rounded-sm' />
          </div>
          <div className='flex w-full items-center justify-between'>
            <div className='skeleton bg-gray-3 h-[1.125rem] w-32'></div>
            <div className='skeleton bg-gray-3 h-[1.375rem] w-[1.375rem] rounded-full'></div>
          </div>
        </div>
      </div>
    </>
  );
}
