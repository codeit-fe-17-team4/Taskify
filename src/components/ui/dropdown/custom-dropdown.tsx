import Image from 'next/image';
import { type ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface CustomDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export default function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = '선택해주세요',
  className,
  disabled = false,
}: CustomDropdownProps): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      {/* 드롭다운 트리거 */}
      <button
        type='button'
        disabled={disabled}
        className={cn(
          'w-full cursor-pointer appearance-none rounded-lg border border-gray-300 p-4 pr-12 text-left focus:outline-none',
          disabled && 'cursor-not-allowed opacity-50',
          isOpen && 'border-violet'
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {selectedOption ? (
          <div className='flex items-center gap-2'>
            {selectedOption.icon}
            {selectedOption.label && <span>{selectedOption.label}</span>}
          </div>
        ) : (
          <span className='text-gray-500'>{placeholder}</span>
        )}

        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4'>
          <Image
            src='/dashboard/input-dropdown-btn.svg'
            alt='드롭다운'
            width={14}
            height={16}
            className={cn('transition-transform', isOpen && 'rotate-180')}
          />
        </div>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className='absolute top-full z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg'>
          {options.map((option) => {
            return (
              <button
                key={option.value}
                type='button'
                className={cn(
                  'w-full cursor-pointer px-4 py-3 text-left first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50',
                  value === option.value && 'bg-indigo-50 text-indigo-600'
                )}
                onClick={() => {
                  handleOptionClick(option.value);
                }}
              >
                <div className='flex items-center gap-2'>
                  <div className='flex h-4 w-4 items-center justify-center'>
                    {value === option.value && (
                      <Image
                        src='/dashboard/check-icon.svg'
                        alt='선택됨'
                        width={10}
                        height={10}
                      />
                    )}
                  </div>
                  {option.icon}
                  {option.label && <span>{option.label}</span>}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
