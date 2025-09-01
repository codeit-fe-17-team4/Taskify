import { useState } from 'react';
import Image from 'next/image';
import type { CreateTaskFormData } from './type';

interface CreateTaskFormProps {
  formData: CreateTaskFormData;
  setFormData: React.Dispatch<React.SetStateAction<CreateTaskFormData>>;
}

export default function CreateTaskForm({
  formData,
  setFormData,
}: CreateTaskFormProps) {
  const [currentTag, setCurrentTag] = useState('');

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
      }));
    }
  };

  return (
    <>
      {/* 담당자 */}
      <div>
        <label htmlFor='assignee' className='mb-2 block text-lg font-medium'>
          담당자
        </label>
        <div className='relative'>
          <select
            id='assignee'
            name='assignee'
            className='w-full appearance-none rounded-lg border border-gray-300 p-4 pr-12 focus:border-blue-500 focus:outline-none'
            value={formData.assignee}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, assignee: e.target.value }))
            }
          >
            <option value=''>이름을 입력해 주세요</option>
            <option value='user1'>사용자 1</option>
            <option value='user2'>사용자 2</option>
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4'>
            <Image
              src='/image/input-dropdown-btn.svg'
              alt='드롭다운'
              width={14}
              height={16}
            />
          </div>
        </div>
      </div>

      {/* 제목 */}
      <div>
        <label
          htmlFor='title'
          className='mb-2 block text-lg leading-6 font-medium'
        >
          제목 <span className='align-baseline text-lg text-indigo-600'>*</span>
        </label>
        <input
          id='title'
          name='title'
          type='text'
          placeholder='제목을 입력해 주세요'
          className='w-full rounded-lg border border-gray-300 p-4 focus:border-blue-500 focus:outline-none'
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          required
        />
      </div>

      {/* 설명 */}
      <div>
        <label
          htmlFor='description'
          className='mb-2 block text-lg leading-6 font-medium'
        >
          설명{' '}
          {!formData.description && (
            <span className='align-baseline text-lg text-indigo-600'>*</span>
          )}
        </label>
        <textarea
          id='description'
          name='description'
          placeholder='설명을 입력해 주세요'
          rows={4}
          className='w-full resize-none rounded-lg border border-gray-300 p-4 focus:border-blue-500 focus:outline-none'
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          required
        />
      </div>

      {/* 마감일 */}
      <div>
        <label htmlFor='dueDate' className='mb-2 block text-lg font-medium'>
          마감일
        </label>
        <div className='relative'>
          <input
            id='dueDate'
            name='dueDate'
            type='datetime-local'
            className='w-full rounded-lg border border-gray-300 p-4 pl-12 focus:border-blue-500 focus:outline-none'
            value={formData.dueDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
            }
          />
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
            <Image
              src='/image/calendar.svg'
              alt='달력'
              width={14}
              height={16}
            />
          </div>
        </div>
      </div>

      {/* 태그 */}
      <div>
        <label htmlFor='tags' className='mb-2 block text-lg font-medium'>
          태그
        </label>
        <input
          id='tags'
          name='tags'
          type='text'
          placeholder='입력 후 Enter'
          className='w-full rounded-lg border border-gray-300 p-4 focus:border-blue-500 focus:outline-none'
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={handleTagKeyDown}
        />
        {formData.tags.length > 0 && (
          <div className='mt-3 flex flex-wrap gap-2'>
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className='flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600'
              >
                {tag}
                <button
                  type='button'
                  onClick={() => removeTag(index)}
                  className='text-blue-400 hover:text-blue-600'
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 이미지 */}
      <div>
        <label
          htmlFor='image-upload'
          className='mb-2 block text-lg font-medium'
        >
          이미지
        </label>
        <div className='flex items-center gap-4'>
          <input
            id='image-upload'
            name='imageFile'
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            className='hidden'
          />
          <label
            htmlFor='image-upload'
            className='flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200'
          >
            <Image
              src='/image/add-image-btn.svg'
              alt='이미지 추가'
              width={18}
              height={18}
            />
          </label>
          {formData.imageFile && (
            <div className='text-sm text-gray-600'>
              {formData.imageFile.name}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
