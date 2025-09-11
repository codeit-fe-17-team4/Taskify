import { motion } from 'framer-motion';
import { type ReactNode, useContext } from 'react';
import { DropdownContext } from '@/components/ui/dropdown';
import { cn } from '@/utils/cn';

interface DropdownListProps {
  children: ReactNode;
  additionalClassName?: string;
  ariaLabel?: string;
}
export default function List({
  children,
  additionalClassName,
  ariaLabel = '메뉴',
}: DropdownListProps): ReactNode {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('DropdownContext 내부에서 호출하세요.');
  }
  const { isOpen } = context;

  return (
    <>
      {isOpen && (
        <motion.div
          role='menu'
          aria-label={ariaLabel}
          className={cn(
            `text-md absolute top-full right-0 left-0 z-[60] mt-1 w-full overflow-hidden rounded-md border border-[var(--auth-border)] bg-[var(--auth-input-bg)] p-1.5 font-medium shadow-lg`,
            additionalClassName
          )}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
