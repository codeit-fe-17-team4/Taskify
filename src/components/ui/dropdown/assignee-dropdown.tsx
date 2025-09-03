import type { ReactNode } from 'react';
import CustomDropdown from './custom-dropdown';
import ChipProfile from '@/components/ui/chip/chip-profile';
import type { DropdownOption } from './custom-dropdown';

interface AssigneeDropdownProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

const assigneeOptions: DropdownOption[] = [
  {
    value: '',
    label: '이름을 입력해 주세요',
  },
  {
    value: 'user1',
    label: '사용자 1',
    icon: <ChipProfile label='사1' size='sm' color='green' />,
  },
  {
    value: 'user2',
    label: '사용자 2',
    icon: <ChipProfile label='사2' size='sm' color='blue' />,
  },
  {
    value: 'te test',
    label: 'te test',
    icon: <ChipProfile label='te' size='sm' color='green' />,
  },
];

export default function AssigneeDropdown({
  value,
  onChange,
  className,
  disabled = false,
}: AssigneeDropdownProps): ReactNode {
  return (
    <CustomDropdown
      options={assigneeOptions}
      value={value}
      onChange={onChange}
      placeholder='담당자를 선택해주세요'
      className={className}
      disabled={disabled}
    />
  );
}
