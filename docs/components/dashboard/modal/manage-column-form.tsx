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
  return (
    <>
      {/* 이름 */}
      <div>
        <label
          htmlFor='column-name'
          className={`mb-2 block text-lg leading-6 font-medium ${
            theme === 'dark' ? 'text-[#d6d5d9]' : 'text-gray-900'
          }`}
        >
          이름 <span className='text-violet align-baseline text-lg'>*</span>
        </label>
        <input
          required
          id='column-name'
          name='name'
          type='text'
          placeholder='컬럼 이름을 입력해 주세요'
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
