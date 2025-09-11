import type { ReactNode } from 'react';
import type { CreateColumnFormData } from '@/components/dashboard/type';
import { useTheme } from '@/contexts/ThemeContext';

interface CreateColumnFormProps {
  formData: CreateColumnFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateColumnFormData>>;
  hasError?: boolean;
}

export default function CreateColumnForm({
  formData,
  setFormData,
  hasError = false,
}: CreateColumnFormProps): ReactNode {
  const { theme } = useTheme();

  return (
    <>
      {/* 이름 */}
      <div>
        <label
          htmlFor='new-column-name'
          className={`mb-2 block text-lg leading-6 font-medium ${
            theme === 'dark'
              ? 'text-[var(--auth-text-strong)]'
              : 'text-gray-900'
          }`}
        >
          컬럼 이름
          <span
            className={`align-baseline text-lg ${
              theme === 'dark' ? 'text-green-500' : 'text-violet'
            }`}
          >
            {' '}
            *
          </span>
        </label>
        <input
          required
          id='new-column-name'
          name='name'
          type='text'
          placeholder='새로운 프로젝트'
          value={formData.name}
          className={`w-full rounded-lg border p-4 focus:outline-none ${
            // eslint-disable-next-line no-nested-ternary
            hasError
              ? 'border-red-500 focus:border-red-500'
              : theme === 'dark'
                ? 'border-[var(--auth-border)] bg-[var(--auth-input-bg)] text-white focus:border-green-500'
                : 'focus:border-violet border-gray-300 bg-white text-gray-900'
          }`}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
      </div>
    </>
  );
}
