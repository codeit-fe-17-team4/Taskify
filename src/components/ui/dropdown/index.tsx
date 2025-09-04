import { createContext, type ReactNode, useState } from 'react';
import Item from '@/components/ui/dropdown/item';
import List from '@/components/ui/dropdown/list';
import Toggle from '@/components/ui/dropdown/toggle';
import useExitWhenClickOutSide from '@/hooks/useExitWhenClickOutSide';

interface ContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DropdownContext = createContext<ContextType | null>(null);

export default function Dropdown({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const dropdownRef = useExitWhenClickOutSide(handleClose);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div className='flex-center relative w-full' ref={dropdownRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Toggle = Toggle;
Dropdown.List = List;
Dropdown.Item = Item;
