import type { ReactNode } from 'react';
import type { InviteMemberFormData } from '@/components/mydashboard/type';

interface InviteMemberFormProps {
  formData: InviteMemberFormData;
  setFormData: React.Dispatch<React.SetStateAction<InviteMemberFormData>>;
}

export default function InviteMemberForm({
  formData,
  setFormData,
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
          value={formData.email}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
      </div>
    </>
  );
}
