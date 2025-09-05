import { type ReactNode, useState } from 'react';
import InviteMemberForm from '@/components/mydashboard/invite-member-form';
import type { InviteMemberFormData } from '@/components/mydashboard/type';
import ButtonModal from '@/components/ui/modal/modal-button';
import { useModalKeyHandler } from '@/hooks/useModal';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: InviteMemberFormData) => void;
}

export default function InviteMemberModal({
  isOpen,
  onClose,
  onSubmit,
}: InviteMemberModalProps): ReactNode {
  const initialFormData: InviteMemberFormData = { email: '' };

  const [formData, setFormData] =
    useState<InviteMemberFormData>(initialFormData);

  const handleClose = () => {
    setFormData(initialFormData); // 초기화
    onClose();
  };

  useModalKeyHandler(isOpen, handleClose);

  const handleSubmit = () => {
    onSubmit(formData);
    handleClose();
  };

  // 간단한 이메일 형식 유효성 검사
  const isEmailValid = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(formData.email);
  const isSubmitDisabled = !isEmailValid;

  return (
    <ButtonModal
      isOpen={isOpen}
      title='초대하기'
      submitText='생성'
      cancelText='취소'
      isSubmitDisabled={isSubmitDisabled}
      width='w-[32rem]'
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <InviteMemberForm formData={formData} setFormData={setFormData} />
    </ButtonModal>
  );
}
