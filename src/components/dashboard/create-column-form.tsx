import type { CreateColumnFormData } from './type';

interface CreateColumnFormProps {
  formData: CreateColumnFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateColumnFormData>>;
  hasError?: boolean;
}

export default function CreateColumnForm({
  formData,
  setFormData,
  hasError = false,
}: CreateColumnFormProps): JSX.Element {
  return (
    <>
      {/* 이름 */}
      <div>
        <label
          htmlFor='new-column-name'
          className='mb-2 block text-lg leading-6 font-medium'
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
