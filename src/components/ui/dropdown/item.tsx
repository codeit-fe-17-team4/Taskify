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
    <li role='menuitem' className='w-full text-lg hover:bg-gray-100'>
      <button className='w-full px-4 py-3.5' onClick={onClick}>
        {children}
      </button>
    </li>
  );
}
