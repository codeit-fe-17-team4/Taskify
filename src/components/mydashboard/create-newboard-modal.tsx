import { type ReactNode, useState } from 'react';
import CreateNewboardForm from '@/components/mydashboard/create-newboard-form';
import type { CreateNewboardFormData } from '@/components/mydashboard/type';
import BaseModal from '@/components/ui/base-modal';
import { useModalKeyHandler } from '@/hooks/useModal';

interface CreateNewboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: CreateNewboardFormData) => void;
}

export default function CreateNewboardModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateNewboardModalProps): ReactNode {
  const [formData, setFormData] = useState<CreateNewboardFormData>({
    title: '',
    color: 'green', // 기본 색상 설정
  });

  const handleClose = () => {
    setFormData({ title: '', color: 'green' });
    onClose();
  };

  useModalKeyHandler(isOpen, handleClose);

  const handleSubmit = () => {
    onSubmit(formData);
    handleClose();
  };

  const isSubmitDisabled = !formData.title.trim();

  return (
    <BaseModal
      isOpen={isOpen}
      title='새로운 대시보드'
      submitText='생성'
      cancelText='취소'
      isSubmitDisabled={isSubmitDisabled}
      width='w-[32rem]'
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <CreateNewboardForm formData={formData} setFormData={setFormData} />
    </BaseModal>
  );
}
