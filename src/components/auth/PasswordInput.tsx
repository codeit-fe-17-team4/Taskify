// 인증 페이지용 비밀번호 입력 컴포넌트 (토글 버튼 포함)
import { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/auth-variables.module.css';

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  placeholder: string;
  error?: string;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  className?: string;
}

export default function PasswordInput({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  showPassword = false,
  onTogglePassword,
  className = '',
}: PasswordInputProps) {
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
      <div className='relative w-[520px] max-[375px]:w-[351px]'>
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`h-[50px] w-[520px] rounded-[8px] bg-white px-[16px] py-[12px] pr-10 ring-1 placeholder:text-[var(--auth-placeholder)] focus:ring-2 focus:ring-[var(--auth-primary)] focus:outline-none focus-visible:outline-none max-[375px]:w-[351px] ${
            error
              ? 'ring-[var(--auth-error)] focus:ring-[var(--auth-error)]'
              : 'ring-[var(--auth-border)]'
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {onTogglePassword && (
          <button
            type='button'
            onClick={onTogglePassword}
            className='absolute top-1/2 right-3 flex h-[24px] w-[24px] -translate-y-1/2 items-center justify-center text-[#9FA6B2] transition-colors duration-200 hover:text-[#5534da]'
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <Image
                src='/auth/icon/visibility.svg'
                alt='비밀번호 숨기기'
                width={24}
                height={24}
              />
            ) : (
              <Image
                src='/auth/icon/visibility-off.svg'
                alt='비밀번호 보기'
                width={24}
                height={24}
              />
            )}
          </button>
        )}
      </div>
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
