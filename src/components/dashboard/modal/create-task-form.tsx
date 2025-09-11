import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { type KeyboardEvent, useState } from 'react';
import {
  type CreateTaskFormData,
  getRandomTagColor,
} from '@/components/dashboard/type';
import ChipProfile, {
  getProfileColorByIdHash,
} from '@/components/ui/chip/chip-profile';
import ChipTag from '@/components/ui/chip/chip-tag';
import Dropdown from '@/components/ui/dropdown';
import { useTheme } from '@/contexts/ThemeContext';
import type { UserType } from '@/lib/users/type';

interface CreateTaskFormProps {
  formData: CreateTaskFormData;
  setFormData: (
    data:
      | CreateTaskFormData
      | ((prev: CreateTaskFormData) => CreateTaskFormData)
  ) => void;
  userInfo: UserType | null;
  members?: {
    userId: number;
    nickname: string;
    profileImageUrl: string | null;
  }[];
}

const DARK_TEXT_COLOR = 'text-[var(--auth-text-strong)]';
const LIGHT_TEXT_COLOR = 'text-gray-900';

export default function CreateTaskForm({
  formData,
  setFormData,
  userInfo,
  members = [],
}: CreateTaskFormProps): React.ReactElement {
  const { theme } = useTheme();
  const [isAssigneeDropdownOpen, setIsAssigneeDropdownOpen] = useState(false);

  const assigneeOptions = members.map((member) => {
    return {
      value: member.nickname,
      label: member.nickname,
      profileColor: getProfileColorByIdHash(member.userId),
      profileImageUrl: member.profileImageUrl,
    };
  });

  const selectedAssignee = assigneeOptions.find(
    (opt) => opt.value === formData.assignee
  );
  const chipProfileLabel = (selectedAssignee?.label || '').slice(0, 1);
  const chipProfileColor = selectedAssignee?.profileColor ?? 'green';

  const handleAssigneeSelect = (assignee: string) => {
    setFormData((prev) => ({ ...prev, assignee }));
    setIsAssigneeDropdownOpen(false);
  };

  /**
   * ===== 태그 관련 핸들러 =====
   */
  const handleTagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const inputText = e.currentTarget.value.trim();

    if (e.key !== 'Enter') {
      return;
    }
    if (!inputText) {
      return;
    }
    // 한글 조합 중이면 무시
    if (e.nativeEvent.isComposing) {
      return;
    }
    setFormData((prev) => {
      return {
        ...prev,
        tags: [...prev.tags, { label: inputText, color: getRandomTagColor() }],
      };
    });
    e.currentTarget.value = '';
    e.preventDefault();
  };

  const removeTag = (indexToRemove: number) => {
    setFormData((prev) => {
      return {
        ...prev,
        tags: prev.tags.filter((_, index) => index !== indexToRemove),
      };
    });
  };

  /**
   * ===== 이미지 관련 핸들러 =====
   */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFormData((prev) => {
        return {
          ...prev,
          imageFile: file,
        };
      });
    }
  };

  const removeImage = () => {
    setFormData((prev) => {
      return {
        ...prev,
        imageFile: null,
      };
    });
  };

  return (
    <>
      {/* 담당자 */}
      <div>
        <span
          className={`mb-2 block text-lg font-medium ${
            theme === 'dark' ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR
          }`}
        >
          담당자
        </span>
        <Dropdown>
          <Dropdown.Toggle
            onClick={() => {
              setIsAssigneeDropdownOpen(!isAssigneeDropdownOpen);
            }}
          >
            <div
              className={`flex w-full appearance-none items-center justify-between rounded-lg border p-4 pr-4 text-left focus:outline-none ${
                theme === 'dark'
                  ? 'border-[var(--auth-border)] bg-[var(--auth-input-bg)] text-white focus-within:border-green-500'
                  : 'focus-within:border-violet border-gray-300 bg-white text-gray-900'
              }`}
            >
              <div className='flex items-center gap-2'>
                {formData.assignee ? (
                  <>
                    <ChipProfile
                      size='md'
                      label={chipProfileLabel}
                      color={chipProfileColor}
                      profileImageUrl={
                        assigneeOptions.find(
                          (opt) => opt.value === formData.assignee
                        )?.profileImageUrl
                      }
                    />
                    <span>
                      {assigneeOptions.find(
                        (opt) => opt.value === formData.assignee
                      )?.label || '이름을 입력해 주세요'}
                    </span>
                  </>
                ) : (
                  <span
                    className={
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                    }
                  >
                    이름을 입력해 주세요
                  </span>
                )}
              </div>
              <Image
                src='/dashboard/input-dropdown-btn.svg'
                alt='드롭다운'
                width={14}
                height={16}
                className={`transition-transform ${isAssigneeDropdownOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.List>
            {assigneeOptions.map((option) => {
              return (
                <Dropdown.Item
                  key={option.value}
                  additionalClassName='gap-2 px-4 py-3 items-center'
                  onClick={() => {
                    handleAssigneeSelect(option.value);
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
                      color={option.profileColor}
                      size='md'
                      profileImageUrl={option.profileImageUrl}
                    />
                    <span>{option.label}</span>
                  </div>
                </Dropdown.Item>
              );
            })}
          </Dropdown.List>
        </Dropdown>
      </div>

      {/* 제목 */}
      <div>
        <label
          htmlFor='title'
          className={`mb-2 block text-lg leading-6 font-medium ${
            theme === 'dark' ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR
          }`}
        >
          제목{' '}
          <span
            className={`align-baseline text-lg ${
              theme === 'dark' ? 'text-green-500' : 'text-violet'
            }`}
          >
            *
          </span>
        </label>
        <input
          required
          id='title'
          name='title'
          type='text'
          placeholder='제목을 입력해 주세요'
          value={formData.title}
          className={`w-full rounded-lg border p-4 focus:outline-none ${
            theme === 'dark'
              ? 'border-[var(--auth-border)] bg-[var(--auth-input-bg)] text-white placeholder:text-gray-400 focus:border-green-500'
              : 'focus:border-violet border-gray-300 bg-white text-gray-900 placeholder:text-gray-500'
          }`}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
      </div>

      {/* 설명 */}
      <div>
        <label
          htmlFor='description'
          className={`mb-2 block text-lg leading-6 font-medium ${
            theme === 'dark' ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR
          }`}
        >
          설명{' '}
          <span
            className={`align-baseline text-lg ${
              theme === 'dark' ? 'text-green-500' : 'text-violet'
            }`}
          >
            *
          </span>
        </label>
        <textarea
          required
          id='description'
          name='description'
          placeholder='설명을 입력해 주세요'
          rows={4}
          value={formData.description}
          className={`w-full resize-none rounded-lg border p-4 focus:outline-none ${
            theme === 'dark'
              ? 'border-[var(--auth-border)] bg-[var(--auth-input-bg)] text-white placeholder:text-gray-400 focus:border-green-500'
              : 'focus:border-violet border-gray-300 bg-white text-gray-900 placeholder:text-gray-500'
          }`}
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
        <label
          htmlFor='dueDate'
          className={`mb-2 block text-lg font-medium ${
            theme === 'dark' ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR
          }`}
        >
          마감일
        </label>
        <div className='relative'>
          <input
            id='dueDate'
            name='dueDate'
            type='datetime-local'
            value={formData.dueDate}
            placeholder='날짜와 시간을 선택하세요'
            className={`w-full cursor-pointer rounded-lg border p-4 pl-12 focus:outline-none ${
              theme === 'dark'
                ? 'border-[var(--auth-border)] bg-[var(--auth-input-bg)] text-white focus:border-green-500'
                : 'focus:border-violet border-gray-300 bg-white text-gray-900'
            }`}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, dueDate: e.target.value }));
            }}
            onClick={(e) => {
              (e.currentTarget as HTMLInputElement).showPicker();
            }}
          />
          <button
            type='button'
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
          </button>
        </div>
      </div>

      {/* 태그 */}
      <div>
        <label
          htmlFor='tags'
          className={`mb-2 block text-lg font-medium ${
            theme === 'dark' ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR
          }`}
        >
          태그
        </label>
        <div
          className={`flex min-h-[3.5rem] flex-wrap items-center gap-2 rounded-lg border p-3 ${
            theme === 'dark'
              ? 'border-[var(--auth-border)] bg-[var(--auth-input-bg)] focus-within:border-green-500'
              : 'border-gray-300 bg-white focus-within:border-gray-300'
          }`}
        >
          {/* 기존 태그들 */}
          {formData.tags.map((tag, index) => {
            return (
              <AnimatePresence key={`${tag.label}-${tag.color}`}>
                <motion.div
                  className='flex items-center gap-1'
                  initial={{ opacity: 0, scale: 0.5, x: 20, y: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, x: 20, y: 20 }}
                >
                  <ChipTag
                    label={tag.label}
                    size='md'
                    color={
                      tag.color as 'blue' | 'pink' | 'green' | 'brown' | 'red'
                    }
                  />
                  <button
                    type='button'
                    className='ml-1 text-blue-400 hover:text-blue-600'
                    onClick={() => {
                      removeTag(index);
                    }}
                  >
                    ×
                  </button>
                </motion.div>
              </AnimatePresence>
            );
          })}
          {/* 새 태그 입력 */}
          <input
            id='tags'
            name='tags'
            type='text'
            placeholder={formData.tags.length === 0 ? '입력 후 Enter' : ''}
            className={`min-w-[120px] flex-1 border-0 bg-transparent p-1 focus:outline-none ${
              theme === 'dark'
                ? 'text-white placeholder:text-gray-400'
                : 'text-gray-900 placeholder:text-gray-500'
            }`}
            onKeyDown={handleTagKeyDown}
          />
        </div>
      </div>

      {/* 이미지 */}
      <div>
        <label
          htmlFor='image-upload'
          className={`mb-2 block text-lg font-medium ${
            theme === 'dark' ? DARK_TEXT_COLOR : LIGHT_TEXT_COLOR
          }`}
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

          {/* 이미지가 있는 경우 */}
          {formData.imageFile ? (
            <motion.div
              className='group relative'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className='h-20 w-20 overflow-hidden rounded-lg'>
                <Image
                  src={URL.createObjectURL(formData.imageFile)}
                  alt='할일 이미지'
                  width={80}
                  height={80}
                  className='h-full w-full object-cover'
                />
              </div>

              {/* 어두운 오버레이와 편집 버튼 */}
              <label
                htmlFor='image-upload'
                className='bg-opacity-40 absolute inset-0 flex cursor-pointer items-center justify-center rounded-lg bg-black opacity-0 group-hover:opacity-100'
              >
                <Image
                  src='/dashboard/edit-image-btn.svg'
                  alt='이미지 편집'
                  width={24}
                  height={24}
                  className='brightness-0 invert filter'
                />
              </label>

              {/* 삭제 버튼 */}
              <button
                type='button'
                className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-500 hover:bg-gray-600'
                onClick={removeImage}
              >
                <Image
                  alt='이미지 삭제'
                  width={12}
                  height={12}
                  className='brightness-0 invert filter'
                  src={
                    theme === 'dark'
                      ? '/darkauth/icon/close-icon.svg'
                      : '/dashboard/close-icon.svg'
                  }
                />
              </button>
            </motion.div>
          ) : (
            /* 이미지가 없는 경우 */
            <motion.label
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              htmlFor='image-upload'
              className={`flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg ${
                theme === 'dark'
                  ? 'bg-[#3a3a3a] hover:bg-[#4a4a4a]'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Image
                alt='이미지 추가'
                width={18}
                height={18}
                src={
                  theme === 'dark'
                    ? '/darkauth/icon/add_box.svg'
                    : '/dashboard/add-image-btn.svg'
                }
              />
            </motion.label>
          )}
        </div>
      </div>
    </>
  );
}
