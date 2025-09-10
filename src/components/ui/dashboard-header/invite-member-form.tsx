import type { ChangeEventHandler, ReactNode } from 'react';

interface InviteMemberFormProps {
  email: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: () => void;
}

export default function InviteMemberForm({
  email,
  onChange,
  onBlur,
}: InviteMemberFormProps): ReactNode {
  return (
    <>
      <div className='mb-6'>
        <label
          htmlFor='invite-member-email'
          className='mb-2 block text-lg leading-6 font-medium'
        >
          이메일
        </label>
        <input
          required
          id='invite-member-email'
          name='email'
          type='email'
          placeholder='이메일을 입력해주세요'
          className='w-full rounded-lg border border-gray-300 p-4 focus:outline-none'
          value={email}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </>
  );
}
