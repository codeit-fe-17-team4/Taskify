import type { ReactNode } from 'react';
import ChipState from '@/components/ui/chip/chip-state';
import CustomDropdown, type { DropdownOption } from './custom-dropdown';


interface StatusDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const statusOptions: DropdownOption[] = [
  {
    value: 'To Do',
    label: '',
    icon: <ChipState label='To Do' size='md' />,
  },
  {
    value: 'On Progress',
    label: '',
    icon: <ChipState label='On Progress' size='md' />,
  },
  {
    value: 'Done',
    label: '',
    icon: <ChipState label='Done' size='md' />,
  },
];

export default function StatusDropdown({
  value,
  onChange,
  className,
  disabled = false,
}: StatusDropdownProps): ReactNode {
  return (
    <CustomDropdown
      options={statusOptions}
      value={value}
      placeholder='상태를 선택해주세요'
      className={className}
      disabled={disabled}
      onChange={onChange}
    />
  );
}
