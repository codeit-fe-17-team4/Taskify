import { createContext, type ReactNode, useState } from 'react';
import Item from '@/components/ui/dropdown/item';
import List from '@/components/ui/dropdown/list';
import Toggle from '@/components/ui/dropdown/toggle';

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

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DropdownContext.Provider>
  );
}

Dropdown.Toggle = Toggle;
Dropdown.List = List;
Dropdown.Item = Item;
