import { type ReactNode, useContext } from 'react';
import { DropdownContext } from '@/components/ui/dropdown';
import { cn } from '@/utils/cn';

interface DropdownListProps {
  children: ReactNode;
  positionClassName?: string;
  ariaLabel?: string;
}
export default function List({
  children,
  positionClassName,
  ariaLabel = '메뉴',
}: DropdownListProps): ReactNode {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('DropdownContext 내부에서 호출하세요.');
  }
  const { isOpen } = context;

  return (
    isOpen && (
      <ul
        role='menu'
        aria-label={ariaLabel}
        className={cn(
          `text-md absolute top-0 right-0 mt-2 w-full translate-y-1/2 overflow-hidden rounded-md border border-gray-200 bg-white p-1.5 font-medium`,
          positionClassName
        )}
      >
        {children}
      </ul>
    )
  );
}
