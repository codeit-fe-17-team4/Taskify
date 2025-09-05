import { type ReactNode, useContext } from 'react';
import { DropdownContext } from '@/components/ui/dropdown';

export default function Toggle({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('Dropdown Context 내부에서 호출해야 합니다');
  }
  const { isOpen, setIsOpen } = context;
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      role='button'
      tabIndex={0}
      aria-haspopup='menu'
      aria-expanded={isOpen}
      className='flex-center relative h-full w-full'
      onClick={handleToggle}
    >
      {children}
    </div>
  );
}
