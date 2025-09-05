import type { ManageColumnFormData } from './type';

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
  return (
    <>
      {/* 이름 */}
      <div>
        <label
          htmlFor='column-name'
          className='mb-2 block text-lg leading-6 font-medium'
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
              : 'focus:border-violet border-gray-300'
          }`}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
      </div>
    </>
  );
}
