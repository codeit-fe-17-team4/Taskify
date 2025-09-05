import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  type EditTaskFormData,
  getRandomTagColor,
} from '@/components/dashboard/type';
import ChipProfile from '@/components/ui/chip/chip-profile';
import ChipState from '@/components/ui/chip/chip-state';
import ChipTag from '@/components/ui/chip/chip-tag';
import { mockProfileColors } from '@/lib/dashboard-mock-data';
import type { UserType } from '@/lib/users/type';
import { getProfileColor } from '@/utils/profile-color';

interface EditTaskFormProps {
  formData: EditTaskFormData;
  setFormData: (
    data: EditTaskFormData | ((prev: EditTaskFormData) => EditTaskFormData)
  ) => void;
  columns?: { id: string; title: string }[];
  userInfo: UserType | null;
}

export default function EditTaskForm({
  formData,
  setFormData,
  columns = [],
  userInfo,
}: EditTaskFormProps) {
  const [currentTag, setCurrentTag] = useState('');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isAssigneeDropdownOpen, setIsAssigneeDropdownOpen] = useState(false);
  const statusDropdownRef = useRef<HTMLDivElement>(null);
  const assigneeDropdownRef = useRef<HTMLDivElement>(null);

  const statusOptions = columns.map((column) => {
    return {
      value: column.title,
      label: column.title,
    };
  });

  const assigneeOptions = [
    {
      value: userInfo?.id ?? 'user-1',
      label: userInfo?.nickname ?? '사용자',
      profileColor: mockProfileColors[0],
    },
    {
      value: 'user-2',
      label: '테스터',
      profileColor: mockProfileColors[1],
    },
    {
      value: 'user-3',
      label: '관리자',
      profileColor: mockProfileColors[2],
    },
  ];

  const handleStatusSelect = (status: string) => {
    setFormData((prev) => ({ ...prev, status }));
    setIsStatusDropdownOpen(false);
  };

  const handleAssigneeSelect = (assignee: string) => {
    setFormData((prev) => ({ ...prev, assignee }));
    setIsAssigneeDropdownOpen(false);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStatusDropdownOpen(false);
      }
      if (
        assigneeDropdownRef.current &&
        !assigneeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAssigneeDropdownOpen(false);
      }
    };

    if (isStatusDropdownOpen || isAssigneeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isStatusDropdownOpen, isAssigneeDropdownOpen]);

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return;
    }
    if (!currentTag.trim()) {
      return;
    }
    e.preventDefault();
    setFormData((prev) => {
      return {
        ...prev,
        tags: [
          ...prev.tags,
          { label: currentTag.trim(), color: getRandomTagColor() },
        ],
      };
    });
    setCurrentTag('');
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
          <label htmlFor='status' className='mb-2 block text-lg font-medium'>
            상태
          </label>
          <div className='relative' ref={statusDropdownRef}>
            <button
              type='button'
              className='flex w-full cursor-pointer appearance-none items-center justify-between rounded-lg border border-gray-300 p-4 pr-4 text-left focus:outline-none'
              onClick={() => {
                setIsStatusDropdownOpen(!isStatusDropdownOpen);
              }}
            >
              <ChipState label={formData.status} size='md' />
              <Image
                src='/dashboard/input-dropdown-btn.svg'
                alt='드롭다운'
                width={14}
                height={16}
                className={`transition-transform ${isStatusDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* 드롭다운 옵션들 */}
            {isStatusDropdownOpen && (
              <div className='absolute top-full right-0 left-0 z-10 mt-1 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg'>
                {statusOptions.map((option, index) => {
                  return (
                    <button
                      key={option.value}
                      type='button'
                      className={`flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-left hover:bg-gray-50 ${
                        index === 0 ? 'rounded-t-lg' : ''
                      } ${
                        index === statusOptions.length - 1 ? 'rounded-b-lg' : ''
                      }`}
                      onClick={() => {
                        handleStatusSelect(option.value);
                      }}
                    >
                      <div className='flex h-[10px] w-[14px] items-center justify-center'>
                        {formData.status === option.value && (
                          <Image
                            src='/dashboard/check-icon.svg'
                            alt='선택됨'
                            width={14}
                            height={10}
                          />
                        )}
                      </div>
                      <ChipState label={option.label} size='md' />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* 담당자 */}
        <div className='flex-1'>
          <label htmlFor='assignee' className='mb-2 block text-lg font-medium'>
            담당자
          </label>
          <div className='relative' ref={assigneeDropdownRef}>
            <button
              type='button'
              className='flex w-full cursor-pointer appearance-none items-center justify-between rounded-lg border border-gray-300 p-4 pr-4 text-left focus:outline-none'
              onClick={() => {
                setIsAssigneeDropdownOpen(!isAssigneeDropdownOpen);
              }}
            >
              <div className='flex items-center gap-2'>
                {formData.assignee ? (
                  <>
                    <ChipProfile
                      size='md'
                      label={
                        (
                          assigneeOptions.find(
                            (opt) => opt.value === formData.assignee
                          )?.label || ''
                        ).slice(0, 1) || '배'
                      }
                      color={getProfileColor(
                        assigneeOptions.find(
                          (opt) => opt.value === formData.assignee
                        )?.profileColor || mockProfileColors[0]
                      )}
                    />
                    <span>
                      {assigneeOptions.find(
                        (opt) => opt.value === formData.assignee
                      )?.label || '이름을 입력해 주세요'}
                    </span>
                  </>
                ) : (
                  <span className='text-gray-500'>이름을 입력해 주세요</span>
                )}
              </div>
              <Image
                src='/dashboard/input-dropdown-btn.svg'
                alt='드롭다운'
                width={14}
                height={16}
                className={`transition-transform ${isAssigneeDropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* 드롭다운 옵션들 */}
            {isAssigneeDropdownOpen && (
              <div className='absolute top-full right-0 left-0 z-10 mt-1 overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg'>
                {assigneeOptions.map((option, index) => {
                  return (
                    <button
                      key={option.value}
                      type='button'
                      className={`flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-left hover:bg-gray-50 ${
                        index === 0 ? 'rounded-t-lg' : ''
                      } ${
                        index === assigneeOptions.length - 1
                          ? 'rounded-b-lg'
                          : ''
                      }`}
                      onClick={() => {
                        handleAssigneeSelect(String(option.value));
                      }}
                    >
                      <div className='flex h-[10px] w-[14px] items-center justify-center'>
                        {formData.assignee === option.value && (
                          <Image
                            src='/dashboard/check-icon.svg'
                            alt='선택됨'
                            width={14}
                            height={10}
                          />
                        )}
                      </div>
                      <div className='flex items-center gap-2'>
                        <ChipProfile
                          label={(option.label || '').slice(0, 1)}
                          color={getProfileColor(option.profileColor)}
                          size='md'
                        />
                        <span>{option.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 제목 */}
      <div>
        <label
          htmlFor='title'
          className='mb-2 block text-lg leading-6 font-medium'
        >
          제목 <span className='text-violet align-baseline text-lg'>*</span>
        </label>
        <input
          required
          id='title'
          name='title'
          type='text'
          placeholder='제목을 입력해 주세요'
          className='focus:border-violet w-full rounded-lg border border-gray-300 p-4 focus:outline-none'
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
          설명 <span className='text-violet align-baseline text-lg'>*</span>
        </label>
        <textarea
          required
          id='description'
          name='description'
          placeholder='설명을 입력해 주세요'
          rows={4}
          className='focus:border-violet w-full resize-none rounded-lg border border-gray-300 p-4 focus:outline-none'
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
            className='focus:border-violet w-full cursor-pointer rounded-lg border border-gray-300 p-4 pl-12 focus:outline-none'
            value={formData.dueDate}
            placeholder='날짜와 시간을 선택하세요'
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, dueDate: e.target.value }));
            }}
            onClick={(e) => {
              (e.currentTarget as HTMLInputElement).showPicker();
            }}
          />
          <div
            className='absolute inset-y-0 left-0 flex cursor-pointer items-center pl-4'
            onClick={() => {
              const input = document.querySelector(
                '#dueDate'
              ) as HTMLInputElement;

              input.showPicker();
              input.focus();
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
          {formData.tags.map((tag, index) => {
            return (
              <div
                key={`${crypto.randomUUID()}-${tag.label}`}
                className='flex items-center gap-1'
              >
                <ChipTag label={tag.label} color={tag.color} size='md' />
                <button
                  type='button'
                  className='ml-1 text-gray-400 hover:text-gray-600'
                  onClick={() => {
                    removeTag(index);
                  }}
                >
                  ×
                </button>
              </div>
            );
          })}
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
