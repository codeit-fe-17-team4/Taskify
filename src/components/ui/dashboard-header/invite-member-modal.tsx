import { type ChangeEvent, type ReactNode, useState } from 'react';
import InviteMemberForm from '@/components/ui/dashboard-header/invite-member-form';
import ButtonModal from '@/components/ui/modal/modal-button';
import { useMutate } from '@/hooks/useAsync';
import { useModalKeyHandler } from '@/hooks/useModal';
import { CustomError } from '@/lib/custom-error';
import { createInvitation } from '@/lib/dashboards/api';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: string | null;
  onSubmit: () => void | Promise<void>;
}
export default function InviteMemberModal({
  isOpen,
  onClose,
  dashboardId,
  onSubmit,
}: InviteMemberModalProps): ReactNode {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { mutate } = useMutate({
    asyncFunction: () => {
      return createInvitation({
        id: Number(dashboardId),
        body: {
          email,
        },
      });
    },
  });

  useModalKeyHandler(isOpen, onClose);

  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isSubmitDisabled = !isEmailValid;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const validateEmail = () => {
    if (!emailRegex.test(email)) {
      setErrorMessage('이메일 형식으로 입력해주세요');
    } else {
      setErrorMessage('');
    }
  };

  const handleSubmit = async () => {
    if (!dashboardId || !email) {
      return;
    }
    try {
      await mutate();
      onSubmit();
      onClose();
    } catch (error) {
      if (error instanceof CustomError && error.details) {
        setErrorMessage(error.details.message);
      }
    }
  };

  return (
    <ButtonModal
      isOpen={isOpen}
      title='초대하기'
      submitText='생성'
      cancelText='취소'
      isSubmitDisabled={isSubmitDisabled}
      width='w-[32rem]'
      errorMessage={errorMessage}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <InviteMemberForm
        email={email}
        onChange={handleInputChange}
        onBlur={validateEmail}
      />
    </ButtonModal>
  );
}
