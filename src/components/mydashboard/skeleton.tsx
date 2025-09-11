export function DashboardListSkeleton() {
  return (
    <>
      <div className='tablet:w-lg mobile:w-2xs mb-10 flex w-full max-w-4xl flex-col items-end'>
        <div className='tablet:grid-cols-2 mobile:grid-cols-1 relative grid grid-cols-3 gap-2'>
          <div className='skeleton tablet:w-64 mobile:w-[18.312rem] h-[3.75rem] w-[18.312rem]'></div>
          <div className='skeleton tablet:w-64 mobile:w-[18.312rem] h-[3.75rem] w-[18.312rem]'></div>
          <div className='skeleton tablet:w-64 mobile:w-[18.312rem] h-[3.75rem] w-[18.312rem]'></div>
          <div className='skeleton tablet:w-64 mobile:w-[18.312rem] h-[3.75rem] w-[18.312rem]'></div>
          <div className='skeleton tablet:w-64 mobile:w-[18.312rem] h-[3.75rem] w-[18.312rem]'></div>
          <div className='skeleton tablet:w-64 mobile:w-[18.312rem] h-[3.75rem] w-[18.312rem]'></div>
        </div>
        <div className='skeleton mt-4 flex h-9 w-28 items-center justify-end'></div>
      </div>
    </>
  );
}
