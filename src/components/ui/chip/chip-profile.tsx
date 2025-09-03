import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export const ChipVariants = cva(
  `flex-center rounded-full font-semibold text-lg text-white border-2 border-white cursor-pointer font-montserrat`,
  {
    variants: {
      color: {
        green: 'bg-green-500',
        blue: 'bg-sky-400',
        orange: 'bg-orange-400',
        yellow: 'bg-yellow-400',
        brown: 'bg-chip-brown',
        red: 'bg-chip-red-bg text-chip-red',
      },
      size: {
        sm: 'w-[1.375rem] h-[1.375rem] text-[0.625rem]',
        md: 'w-6 h-6 text-xs',
        lg: 'w-[2.375rem] h-[2.375rem] text-lg mobile:w-[2.125rem] mobile:h-[2.125rem]',
      },
    },
    defaultVariants: {
      color: 'green',
      size: 'md',
    },
  }
);
interface ChipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ChipVariants> {
  children?: ReactNode;
  /** 버튼 내부 텍스트 */
  label: string;
  /** 사이즈: 'sm' | 'md' | 'lg' */
  size: 'sm' | 'md' | 'lg';
  /** 색상: 'green' | 'blue' | 'orange' | 'yellow' | 'brown' */
  color: 'green' | 'blue' | 'orange' | 'yellow' | 'brown' | 'red';
}
/** 사이즈:
 * - 'sm' : 1.375rem(22px)
 * - 'md' : 1.5rem (24px)
 * - 'lg' : 2.375rem (38px).
 */
export default function ChipProfile({
  label,
  size = 'md',
  color = 'green',
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
