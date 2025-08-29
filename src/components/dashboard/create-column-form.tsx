interface ColumnFormData {
  name: string;
}

interface CreateColumnFormProps {
  formData: ColumnFormData;
  setFormData: React.Dispatch<React.SetStateAction<ColumnFormData>>;
}

export default function CreateColumnForm({
  formData,
  setFormData,
}: CreateColumnFormProps) {
  return (
    <>
      {/* 이름 */}
      <div>
        <label
          htmlFor='new-column-name'
          className='mb-2 block text-lg leading-6 font-medium'
        >
          이름{' '}
          {!formData.name && (
            <span className='align-baseline text-lg text-indigo-600'>*</span>
          )}
        </label>
        <input
          id='new-column-name'
          name='name'
          type='text'
          placeholder='새로운 프로젝트'
          className='w-full rounded-lg border border-gray-300 p-4'
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

export type { ColumnFormData };
