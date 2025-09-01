// 인증 페이지용 공통 버튼 컴포넌트 (로딩 상태 포함)
interface AuthButtonProps {
  type: 'submit' | 'button';
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  className?: string;
}

export default function AuthButton({
  type,
  disabled = false,
  isLoading = false,
  loadingText,
  children,
  className = '',
}: AuthButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      className={`h-[50px] w-[520px] shrink-0 rounded-[8px] text-center text-[18px] leading-[26px] font-[500] text-white max-[375px]:w-[351px] ${
        !isDisabled
          ? 'cursor-pointer bg-[var(--auth-primary)] transition-opacity hover:opacity-90'
          : 'cursor-not-allowed bg-[var(--auth-placeholder)]'
      } ${className}`}
    >
      {isLoading && loadingText ? loadingText : children}
    </button>
  );
}
