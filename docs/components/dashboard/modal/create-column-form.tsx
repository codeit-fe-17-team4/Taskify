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
            theme === 'dark' ? 'text-[#d6d5d9]' : 'text-gray-900'
          }`}
        >
          대시보드 이름
          <span className='text-violet align-baseline text-lg'> *</span>
        </label>
        <input
          required
          id='new-column-name'
          name='name'
          type='text'
          placeholder='새로운 프로젝트'
          value={formData.name}
          className={`w-full rounded-lg border p-4 focus:outline-none ${
            hasError
              ? 'border-red-500 focus:border-red-500'
              : theme === 'dark'
                ? 'border-[#524f5b] bg-[#201f23] text-white placeholder:text-gray-400 focus:border-green-500'
                : 'focus:border-violet border-gray-300 bg-white text-gray-900 placeholder:text-gray-500'
          }`}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
      </div>
    </>
  );
}
