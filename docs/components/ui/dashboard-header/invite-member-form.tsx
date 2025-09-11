import type { ReactNode } from 'react';
import type { InviteMemberFormData } from '@/components/mydashboard/type';
import { useTheme } from '@/contexts/ThemeContext';

interface InviteMemberFormProps {
  formData: InviteMemberFormData;
  setFormData: React.Dispatch<React.SetStateAction<InviteMemberFormData>>;
}

export default function InviteMemberForm({
  formData,
  setFormData,
}: InviteMemberFormProps): ReactNode {
  const { theme } = useTheme();

  // 다크테마용 인풋 스타일
  const INPUT_STYLES = {
    base: 'w-full rounded-lg border p-4 focus:outline-none focus:ring-2 focus:ring-[var(--auth-primary)]',
    dark: 'border-[var(--auth-border)] bg-[var(--auth-input-bg)] text-[var(--auth-text-strong)] placeholder:text-[var(--auth-placeholder)]',
    light: 'border-gray-300 bg-white text-gray-900 placeholder:text-gray-400',
  };

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
          className={`${INPUT_STYLES.base} ${
            theme === 'dark' ? INPUT_STYLES.dark : INPUT_STYLES.light
          }`}
          value={formData.email}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
      </div>
    </>
  );
}
