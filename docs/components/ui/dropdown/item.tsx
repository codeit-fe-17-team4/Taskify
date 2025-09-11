import { type ReactNode, useContext, useRef } from 'react';
import { DropdownContext } from '@/components/ui/dropdown';
import useCallbackWhenClickItem from '@/components/ui/dropdown/useCallbackWhenClickItem';
import { cn } from '@/utils/cn';

interface DropdownItemProps {
  children: ReactNode;
  onClick: () => void;
  additionalClassName?: string;
}
export default function Item({
  children,
  onClick,
  additionalClassName,
}: DropdownItemProps): ReactNode {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('DropdownContext 내부에서 호출하세요.');
  }
  const { setIsOpen } = context;
  const itemButtonRef = useRef(null);
  const handleClose = () => {
    setIsOpen(false);
  };

  useCallbackWhenClickItem(itemButtonRef, handleClose);

  return (
    <button
      ref={itemButtonRef}
      role='menuitem'
      type='button'
      className={cn(
        'flex h-full w-full items-center gap-2 rounded-md px-1 py-3 text-[var(--modal-text)] hover:bg-[var(--button-secondary-hover)] hover:text-[var(--auth-primary)]',
        additionalClassName
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
