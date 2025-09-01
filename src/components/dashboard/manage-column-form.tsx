import type { ManageColumnFormData } from './type';

interface ManageColumnFormProps {
  formData: ManageColumnFormData;
  setFormData: React.Dispatch<React.SetStateAction<ManageColumnFormData>>;
}

export default function ManageColumnForm({
  formData,
  setFormData,
}: ManageColumnFormProps) {
  return (
    <>
      {/* 이름 */}
      <div>
        <label
          htmlFor='column-name'
          className='mb-2 block text-lg leading-6 font-medium'
        >
          이름 <span className='align-baseline text-lg text-indigo-600'>*</span>
        </label>
        <input
          id='column-name'
          name='name'
          type='text'
          placeholder='컬럼 이름을 입력해 주세요'
          className='w-full rounded-lg border border-gray-300 p-4 focus:border-blue-500 focus:outline-none'
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
      </div>
    </>
  );
}
