export default function SideMenuSkeleton() {
  return (
    <ul className='flex flex-col items-center gap-3'>
      {Array(8)
        .fill(0)
        .map((_, i) => {
          return (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className='skeleton mobile:w-8 mobile:h-8 h-[2rem] w-[90%] rounded-sm'
            ></li>
          );
        })}
    </ul>
  );
}
