import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
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
export interface ChipProfileProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ChipVariants> {
  children?: ReactNode;
  /** 버튼 내부 텍스트 */
  label: string;
  /** 사이즈: 'sm' | 'md' | 'lg' */
  size: 'sm' | 'md' | 'lg';
  /** 색상: 'green' | 'blue' | 'orange' | 'yellow' | 'brown' */
  color: 'green' | 'blue' | 'orange' | 'yellow' | 'brown' | 'red';
  /** 프로필 이미지 URL */
  profileImageUrl?: string | null;
}
/** 사이즈:
 * - 'sm' : 1.375rem(22px)
 * - 'md' : 1.5rem (24px)
 * - 'lg' : 2.375rem (38px).
 */
const imageSize = {
  sm: 22,
  md: 24,
  lg: 38,
};

export default function ChipProfile({
  label,
  size = 'md',
  color = 'green',
  profileImageUrl,
  ...props
}: ChipProfileProps): ReactNode {
  // 프로필 이미지가 있고 유효한 경우 이미지 표시
  if (profileImageUrl && profileImageUrl.trim() !== '') {
    return (
      <div
        className={cn(ChipVariants({ color, size }), 'overflow-hidden')}
        {...props}
      >
        <Image
          src={profileImageUrl}
          alt='프로필 이미지'
          width={imageSize[size]}
          height={imageSize[size]}
          className='h-full w-full object-cover'
        />
      </div>
    );
  }

  // 프로필 이미지가 없는 경우 기본 색상 칩 표시
  return (
    <div className={cn(ChipVariants({ color, size }))} {...props}>
      <span>{label}</span>
    </div>
  );
}
