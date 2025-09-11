export function DashboardHeaderSkeleton() {
  return (
    <header className='mobile:h-[3.75rem] border-gray-3 tablet:pl-48 mobile:pl-12 tablet:justify-between mobile:justify-end fixed top-0 right-0 left-0 z-20 flex h-[4.375rem] w-full items-center justify-between border-b-1 bg-white pl-84'>
      <div className='mobile:hidden skeleton tablet:w-32 h-8 w-56' />
      <nav className='mobile:gap-2 flex h-full items-center gap-8'>
        <div className='mobile:gap-1.5 flex gap-3'>
          <div className='mobile:w-[3.125rem] skeleton h-9 w-[5.375rem]' />
          <div className='mobile:w-[3.125rem] skeleton h-9 w-[5.375rem]' />
        </div>
        <div className='mobile:gap-3 flex-center h-full gap-6'>
          <div className='skeleton h-9 w-20' />
          <div className='border-l-gray-3 mobile:pl-3 tablet:pr-8 mobile:pr-2 flex h-full items-center gap-3 border-l-1 pr-20 pl-6'>
            <span className='skeleton h-9 w-9 rounded-full'></span>
            <span className='skeleton h-9 w-10'></span>
          </div>
        </div>
      </nav>
    </header>
  );
}
