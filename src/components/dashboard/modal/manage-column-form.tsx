import type { ManageColumnFormData } from '@/components/dashboard/type';
import { useTheme } from '@/contexts/ThemeContext';

interface ManageColumnFormProps {
  formData: ManageColumnFormData;
  setFormData: React.Dispatch<React.SetStateAction<ManageColumnFormData>>;
  hasError?: boolean;
}

export default function ManageColumnForm({
  formData,
  setFormData,
  hasError = false,
}: ManageColumnFormProps) {
  const { theme } = useTheme();

  let inputClass = '';

  if (hasError) {
    inputClass = 'border-red-500 focus:border-red-500';
  } else if (theme === 'dark') {
    inputClass =
      'border-[var(--auth-border)] bg-[var(--auth-input-bg)] text-white focus:border-green-500';
  } else {
    inputClass = 'focus:border-violet border-gray-300 bg-white text-gray-900';
  }

  return (
    <>
      {/* 이름 */}
      <div>
        <label
          htmlFor='column-name'
          className={`mb-2 block text-lg leading-6 font-medium ${
            theme === 'dark'
              ? 'text-[var(--auth-text-strong)]'
              : 'text-gray-900'
          }`}
        >
          이름{' '}
          <span
            className={`align-baseline text-lg ${
              theme === 'dark' ? 'text-green-500' : 'text-violet'
            }`}
          >
            *
          </span>
        </label>
        <input
          required
          id='column-name'
          name='name'
          type='text'
          placeholder='컬럼 이름을 입력해 주세요'
          value={formData.name}
          className={`w-full rounded-lg border p-4 focus:outline-none ${inputClass}`}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
      </div>
    </>
  );
}
