import Image from 'next/image';
import { useState } from 'react';
import ChipTag from '@/components/ui/chip/chip-tag';
import AssigneeDropdown from '@/components/ui/dropdown/assignee-dropdown';
import StatusDropdown from '@/components/ui/dropdown/status-dropdown';
import type { EditTaskFormData } from './type';

interface EditTaskFormProps {
  formData: EditTaskFormData;
  setFormData: React.Dispatch<React.SetStateAction<EditTaskFormData>>;
}

export default function EditTaskForm({
  formData,
  setFormData,
}: EditTaskFormProps) {
  const [currentTag, setCurrentTag] = useState('');

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      setFormData((prev) => {
        return {
          ...prev,
          tags: [...prev.tags, currentTag.trim()],
        };
      });
      setCurrentTag('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    setFormData((prev) => {
      return {
        ...prev,
        tags: prev.tags.filter((_, index) => index !== indexToRemove),
      };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormData((prev) => {
        return {
          ...prev,
          imageFile: file,
          existingImageUrl: undefined,
        };
      });
    }
  };

  const removeImage = () => {
    setFormData((prev) => {
      return {
        ...prev,
        imageFile: null,
        existingImageUrl: undefined,
      };
    });
  };

  return (
    <>
      <div className='flex gap-4'>
        {/* 상태 */}
        <div className='flex-1'>
          <label className='mb-2 block text-lg font-medium'>상태</label>
          <StatusDropdown
            value={formData.status}
            onChange={(value) => {
              setFormData((prev) => ({ ...prev, status: value }));
            }}
          />
        </div>

        {/* 담당자 */}
        <div className='flex-1'>
          <label className='mb-2 block text-lg font-medium'>담당자</label>
          <AssigneeDropdown
            value={formData.assignee}
            onChange={(value) => {
              setFormData((prev) => ({ ...prev, assignee: value }));
            }}
          />
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
          required
          id='title'
          name='title'
          type='text'
          placeholder='제목을 입력해 주세요'
          className='w-full rounded-lg border border-gray-300 p-4 focus:outline-none'
          value={formData.title}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
      </div>

      {/* 설명 */}
      <div>
        <label
          htmlFor='description'
          className='mb-2 block text-lg leading-6 font-medium'
        >
          설명 <span className='align-baseline text-lg text-indigo-600'>*</span>
        </label>
        <textarea
          required
          id='description'
          name='description'
          placeholder='설명을 입력해 주세요'
          rows={4}
          className='w-full resize-none rounded-lg border border-gray-300 p-4 focus:outline-none'
          value={formData.description}
          onChange={(e) => {
            setFormData((prev) => {
              return {
                ...prev,
                description: e.target.value,
              };
            });
          }}
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
            className='w-full cursor-pointer rounded-lg border border-gray-300 p-4 pl-12 focus:outline-none'
            value={formData.dueDate}
            placeholder='날짜와 시간을 선택하세요'
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, dueDate: e.target.value }));
            }}
            onClick={(e) => {
              (e.currentTarget as any).showPicker?.();
            }}
          />
          <div
            className='absolute inset-y-0 left-0 flex cursor-pointer items-center pl-4'
            onClick={() => {
              const input = document.querySelector(
                '#dueDate'
              ) as HTMLInputElement;

              (input as any)?.showPicker?.();
              input?.focus();
            }}
          >
            <Image
              src='/dashboard/calendar.svg'
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
        <div className='flex min-h-[3.5rem] flex-wrap items-center gap-2 rounded-lg border border-gray-300 p-3 focus-within:border-gray-300'>
          {/* 기존 태그들 */}
          {formData.tags.map((tag, index) => 
            { return <div key={index} className='flex items-center gap-1'>
              <ChipTag
                label={tag}
                color={index === 0 ? 'brown' : 'blue'}
                size='md'
              />
              <button
                type='button'
                className='ml-1 text-gray-400 hover:text-gray-600'
                onClick={() => { removeTag(index); }}
              >
                ×
              </button>
            </div> }
          )}
          {/* 새 태그 입력 */}
          <input
            id='tags'
            name='tags'
            type='text'
            placeholder={formData.tags.length === 0 ? '입력 후 Enter' : ''}
            className='min-w-[120px] flex-1 border-0 bg-transparent p-1 focus:outline-none'
            value={currentTag}
            onKeyDown={handleTagKeyDown}
            onChange={(e) => {
              setCurrentTag(e.target.value);
            }}
          />
        </div>
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
            className='hidden'
            onChange={handleImageUpload}
          />

          {/* 1. 이미지가 첨부되어 있는 경우 */}
          {formData.existingImageUrl || formData.imageFile ? (
            <div className='group relative'>
              <div className='h-20 w-20 overflow-hidden rounded-lg'>
                {formData.imageFile ? (
                  <Image
                    src={URL.createObjectURL(formData.imageFile)}
                    alt='할일 이미지'
                    width={80}
                    height={80}
                    className='h-full w-full object-cover'
                  />
                ) : formData.existingImageUrl ? (
                  <Image
                    src={formData.existingImageUrl}
                    alt='할일 이미지'
                    width={80}
                    height={80}
                    className='h-full w-full object-cover'
                  />
                ) : null}
              </div>

              <label
                htmlFor='image-upload'
                className='bg-opacity-10 absolute inset-0 flex cursor-pointer items-center justify-center rounded-lg bg-black opacity-0 transition-opacity duration-200 hover:opacity-100'
              >
                <Image
                  src='/dashboard/edit-image-btn.svg'
                  alt='이미지 편집'
                  width={24}
                  height={24}
                  className='brightness-0 invert filter'
                />
              </label>

              <button
                type='button'
                className='absolute -top-1 -right-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-gray-500 hover:bg-gray-600'
                onClick={removeImage}
              >
                <Image
                  src='/dashboard/close-icon.svg'
                  alt='이미지 삭제'
                  width={12}
                  height={12}
                  className='brightness-0 invert filter'
                />
              </button>
            </div>
          ) : (
            /* 2. 이미지가 없는 경우 */
            <label
              htmlFor='image-upload'
              className='flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200'
            >
              <Image
                src='/dashboard/add-image-btn.svg'
                alt='이미지 추가'
                width={18}
                height={18}
              />
            </label>
          )}
        </div>
      </div>
    </>
  );
}
