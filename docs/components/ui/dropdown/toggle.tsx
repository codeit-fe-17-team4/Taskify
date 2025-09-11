import { type ReactNode, useContext, useRef } from 'react';
import { DropdownContext } from '@/components/ui/dropdown';
import useCallbackWhenClickItem from '@/components/ui/dropdown/useCallbackWhenClickItem';

interface ToggleProps {
  children: ReactNode;
  onClick?: () => void;
}
export default function Toggle({ children, onClick }: ToggleProps): ReactNode {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('Dropdown Context 내부에서 호출해야 합니다');
  }
  const { isOpen, setIsOpen } = context;
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const toggleButtonRef = useRef(null);

  useCallbackWhenClickItem(toggleButtonRef, handleToggle);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      ref={toggleButtonRef}
      role='button'
      tabIndex={0}
      aria-haspopup='menu'
      aria-expanded={isOpen}
      className='flex-center relative h-full w-full cursor-pointer'
      onClick={onClick}
    >
      {children}
    </div>
  );
}
