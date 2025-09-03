import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export const ChipVariants = cva(`flex-center gap-1.5 rounded-sm font-normal`, {
  variants: {
    color: {
      blue: 'bg-chip-blue-bg text-chip-blue',
      pink: 'bg-chip-pink-bg text-chip-pink',
      green: 'bg-chip-green-bg text-chip-green',
      brown: 'bg-chip-brown-bg text-chip-brown',
    },
    size: {
      md: 'text-xs px-1.5 py-1 h-[1.625rem]',
      lg: 'text-md px-1.5 py-0.5 h-7',
    },
  },
  defaultVariants: {
    color: 'blue',
    size: 'md',
  },
});
interface ChipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ChipVariants> {
  /** 버튼 내부 텍스트 */
  label: string;
  /** 사이즈: 'md' | 'lg'*/
  size: 'md' | 'lg';
  /** 색상: 'blue' | 'pink' | 'green' | 'brown'*/
  color: 'blue' | 'pink' | 'green' | 'brown';
}
export default function ChipTag({
  label,
  size = 'md',
  color = 'blue',
  ...props
}: ChipProps): ReactNode {
  return (
    <>
      <div className={cn(ChipVariants({ color, size }))} {...props}>
        <span>{label}</span>
      </div>
    </>
  );
}
