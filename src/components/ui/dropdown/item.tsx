import type { ReactNode } from 'react';

interface DropdownItemProps {
  children: ReactNode;
  onClick: () => void;
}
export default function Item({
  children,
  onClick,
}: DropdownItemProps): ReactNode {
  return (
    <li
      role='menuitem'
      className='hover:bg-violet-light hover:text-violet w-full rounded-md'
    >
      <button className='w-full px-4 py-1' onClick={onClick}>
        {children}
      </button>
    </li>
  );
}
