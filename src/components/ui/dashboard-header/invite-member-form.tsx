import type { ChangeEventHandler, ReactNode } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface InviteMemberFormProps {
  email: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: () => void;
}

export default function InviteMemberForm({
  email,
  onChange,
  onBlur,
}: InviteMemberFormProps): ReactNode {
  const { theme } = useTheme();

  return (
    <>
      <div className='mb-6'>
        <label
          htmlFor='invite-member-email'
          className={`mb-2 block text-lg leading-6 font-medium ${
            theme === 'dark'
              ? 'text-[var(--auth-text-strong)]'
              : 'text-gray-900'
          }`}
        >
          이메일
        </label>
        <input
          required
          id='invite-member-email'
          name='email'
          type='email'
          placeholder='이메일을 입력해주세요'
          value={email}
          className={`w-full rounded-lg border p-4 focus:ring-2 focus:ring-[var(--auth-primary)] focus:outline-none ${
            theme === 'dark'
              ? 'border-[var(--auth-border)] bg-[var(--auth-input-bg)] text-[var(--auth-text-strong)] placeholder:text-[var(--auth-placeholder)]'
              : 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-400'
          }`}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </>
  );
}
