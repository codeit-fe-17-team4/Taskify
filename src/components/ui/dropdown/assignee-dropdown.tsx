import type { ReactNode } from 'react';
import ChipProfile from '@/components/ui/chip/chip-profile';
import CustomDropdown, type { DropdownOption } from './custom-dropdown';




interface AssigneeDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  prefix?: ReactNode;
}

export default function AssigneeDropdown({
  options,
  value,
  onChange,
  placeholder,
  prefix,
}: AssigneeDropdownProps) {
  return (
    <CustomDropdown
      options={options}
      value={value}
      placeholder={placeholder}
      prefix={prefix}
      renderOption={(option) => 
        { return <div className="flex items-center gap-2">
          <ChipProfile name={option.label} />
          <span>{option.label}</span>
        </div> }
      }
      onChange={onChange}
    />
  );
}
