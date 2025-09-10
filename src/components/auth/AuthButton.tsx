import Button from '@/components/ui/button/button';

// 인증 페이지용 공통 버튼 컴포넌트 (로딩 상태 포함)
interface AuthButtonProps {
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  className?: string;
}

export default function AuthButton({
  disabled = false,
  isLoading = false,
  loadingText,
  children,
  className = '',
}: AuthButtonProps): React.JSX.Element {
  const isDisabled = disabled || isLoading;

  return (
    <Button
      variant='primary'
      backgroundColor='violet'
      aria-disabled={isDisabled}
      disabled={isDisabled}
      label={''}
      additionalClass={className}
    >
      {isLoading && loadingText ? loadingText : children}
    </Button>
  );
}
