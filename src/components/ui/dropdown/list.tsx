import { type ReactNode, useContext } from 'react';
import { DropdownContext } from '@/components/ui/dropdown';

export default function List({ children }: { children: ReactNode }): ReactNode {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('DropdownContext 내부에서 호출하세요.');
  }
  const { isOpen } = context;

  return (
    isOpen && (
      <ul
        role='menu'
        aria-label='사용자 메뉴'
        className='text-md absolute top-full right-4 mt-2 overflow-hidden rounded-md border border-gray-200 bg-white p-1.5 font-medium'
      >
        {children}
      </ul>
    )
  );
}
