// 인증 페이지용 이메일 입력 컴포넌트
import styles from '@/styles/auth-variables.module.css';

interface EmailInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  placeholder: string;
  error?: string;
  className?: string;
}

export default function EmailInput({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  className = '',
}: EmailInputProps) {
  return (
    <div
      className={`flex w-[520px] flex-col gap-0 max-[375px]:w-[351px] ${className}`}
    >
      <label
        htmlFor={id}
        className={`${styles.textStrong} mb-2 text-[16px] leading-[26px]`}
      >
        {label}
      </label>
      <input
        id={id}
        type='email'
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`h-[50px] w-[520px] rounded-[8px] bg-white px-[16px] py-[15px] ring-1 placeholder:text-[var(--auth-placeholder)] focus:ring-2 focus:ring-[var(--auth-primary)] focus:outline-none focus-visible:outline-none max-[375px]:w-[351px] ${
          error
            ? 'ring-[var(--auth-error)] focus:ring-[var(--auth-error)]'
            : 'ring-[var(--auth-border)]'
        }`}
        onChange={(e) => { onChange(e.target.value); }}
        onBlur={onBlur}
      />
      {error && (
        <p
          id={`${id}-error`}
          className='mt-2 text-[14px] leading-[24px] text-[var(--auth-error)] max-[375px]:mt-[8px]'
          aria-live='polite'
        >
          {error}
        </p>
      )}
    </div>
  );
}
