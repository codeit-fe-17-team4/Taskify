import type { ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/utils/cn';

interface ChipProps {
  children?: ReactNode;
  label: string;
  /** 사이즈: md | lg*/
  size: 'md' | 'lg';
}
export default function ChipState({
  children,
  size = 'md',
  label,
  ...props
}: ChipProps): ReactNode {
  const { theme } = useTheme();

  return (
    <>
      <div
        className={cn(
          'flex-center gap-1.5 rounded-2xl px-2 py-1 text-xs font-normal',
          theme === 'dark'
            ? 'bg-[var(--button-secondary)] text-[var(--auth-primary)]'
            : 'bg-violet-light text-violet',
          size === 'lg' && 'text-md'
        )}
        {...props}
      >
        {children}
        <span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='6.5'
            height='6.5'
            fill='none'
          >
            <circle
              cx='3'
              cy='3'
              r='3'
              fill={theme === 'dark' ? 'var(--auth-primary)' : '#5534DA'}
            />
          </svg>
        </span>
        <span>{label}</span>
      </div>
    </>
  );
}
