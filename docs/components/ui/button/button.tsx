import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

export const ButtonVariants = cva(
  `flex-center w-full p-3.5
  bg-violet disabled:bg-gray-2 text-white text-lg font-semibold
  disabled:hover:bg-gray-2 disabled:hover:scale-100 disabled:cursor-not-allowed cursor-pointer
  `,
  {
    variants: {
      variant: {
        primary: 'rounded-lg',
        invitation:
          'text-md h-8 tablet:h-[1.875rem] mobile:h-8 max-w-[5.25rem] tablet:max-w-[4.5rem] mobile:max-w-full py-2 rounded-sm',
        modal: 'h-[2.625rem] mobile:h-12 py-3 mobile:py-3.5 rounded-lg',
      },
      backgroundColor: {
        violet:
          'bg-[var(--button-primary)] hover:bg-[var(--button-primary-hover)] active:bg-[var(--button-primary-active)] text-white dark:bg-[#10671f] dark:hover:bg-[#0d5a1a] dark:active:bg-[#0a4d16]',
        white:
          'bg-white border border-gray-300 text-violet hover:bg-gray-4 active:bg-gray-3 disabled:hover:bg-white dark:bg-[var(--auth-input-bg)] dark:border-[#524f5b] dark:text-[var(--auth-text-strong)] dark:hover:bg-[var(--auth-input-bg)]',
      },
      labelColor: {
        gray: 'text-gray-1',
      },
    },
    defaultVariants: {
      variant: 'primary',
      backgroundColor: 'violet',
    },
  }
);
interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  /** 버튼 형태 */
  variant: 'primary' | 'invitation' | 'modal';
  /** 배경 색상 */
  backgroundColor: 'violet' | 'white';
  /** 텍스트 색상: button-modal만 사용 (gray)*/
  labelColor?: 'gray';
  /** 버튼 내부 텍스트 */
  label: string;
  /** 추가적인 tailwind className */
  additionalClass?: string;
  /** button disabled 여부 */
  disabled?: boolean;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
  children?: ReactNode;
}
/**
 * primary, modal, invitation 세가지 형태의 버튼을 표시합니다.
 * ## width 반응형 규칙
 * ### 1.primary, modal
 * - PC/Tablet/Mobile: width: 100%로 동일 (컨테이너 크기에 맞춰서 변화)
 *
 * ### 2.invitation
 * - PC(1280px+): max-width: 5.25rem (84px)
 * - tablet(768px+): max-width: 4.5rem (72px)
 * - Mobile (767px 이하): max-width: 100% (컨테이너 크기에 맞춰서 변화)
 */
export default function Button({
  variant,
  backgroundColor = 'violet',
  children,
  label,
  labelColor,
  additionalClass = '',
  onClick,
  ...props
}: ButtonProps): ReactNode {
  return (
    <>
      <button
        className={cn(
          ButtonVariants({ variant, backgroundColor, labelColor }),
          additionalClass
        )}
        onClick={onClick}
        {...props}
      >
        {children}
        {label}
      </button>
    </>
  );
}
