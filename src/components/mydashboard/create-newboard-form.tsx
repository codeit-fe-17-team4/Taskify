import Image from 'next/image';
import type { ReactNode } from 'react';
import type { CreateNewboardFormData } from '@/components/mydashboard/type';

interface CreateNewboardFormProps {
  formData: CreateNewboardFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateNewboardFormData>>;
}

export default function CreateNewboardForm({
  formData,
  setFormData,
}: CreateNewboardFormProps): ReactNode {
  const colors = [
    { name: 'green', bgClass: 'bg-lime-500', hexCode: '#7AC555' },
    { name: 'purple', bgClass: 'bg-purple-700', hexCode: '#760DDE' },
    { name: 'orange', bgClass: 'bg-amber-500', hexCode: '#FFA500' },
    { name: 'blue', bgClass: 'bg-blue-300', hexCode: '#76A5EA' },
    { name: 'pink', bgClass: 'bg-fuchsia-400', hexCode: '#E876EA' },
  ];

  return (
    <>
      {/* 대시보드 이름 */}
      <div className='mb-6'>
        <label
          htmlFor='new-dashboard-name'
          className='mb-2 block text-lg leading-6 font-medium text-[var(--auth-text-strong)]'
        >
          <span>대시보드 이름</span>
        </label>
        <input
          required
          id='new-dashboard-name'
          name='name'
          type='text'
          maxLength={10}
          placeholder='새로운 대시보드'
          className='w-full rounded-lg border border-[var(--auth-border)] bg-[var(--auth-input-bg)] p-4 text-[var(--auth-text-strong)] placeholder:text-[var(--auth-placeholder)] focus:ring-2 focus:ring-[var(--auth-primary)] focus:outline-none'
          value={formData.title}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
      </div>
      {/* 색상 선택 */}
      <div>
        <div className='flex items-center gap-2'>
          {colors.map((color) => {
            return (
              <button
                key={color.name}
                type='button'
                className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-2 transition-all ${
                  color.bgClass
                } ${
                  formData.color === color.hexCode
                    ? 'scale-110 border-transparent'
                    : 'border-transparent hover:scale-110'
                }`}
                onClick={() => {
                  setFormData((prev) => ({ ...prev, color: color.hexCode }));
                }}
              >
                {formData.color === color.hexCode && (
                  <Image
                    src='/icon/selected.svg'
                    alt='selected'
                    width={16}
                    height={16}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
