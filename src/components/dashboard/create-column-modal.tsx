import { useState } from 'react';
import { useModalKeyHandler } from '@/hooks/useModal';
import BaseModal from '../ui/base-modal';
import CreateColumnForm from './create-column-form';
import type { CreateColumnFormData } from './type';

interface CreateColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (columnData: CreateColumnFormData) => void;
}

export default function CreateColumnModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateColumnModalProps) {
  const [formData, setFormData] = useState<CreateColumnFormData>({
    name: '',
  });

  const handleClose = () => {
    setFormData({ name: '' });
    onClose();
  };

  useModalKeyHandler(isOpen, handleClose);

  const handleSubmit = () => {
    onSubmit(formData);
    handleClose();
  };

  const isSubmitDisabled = !formData.name.trim();

  return (
    <BaseModal
      isOpen={isOpen}
      title='새 컬럼 생성'
      submitText='생성'
      cancelText='취소'
      isSubmitDisabled={isSubmitDisabled}
      width='w-[32rem]'
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <CreateColumnForm formData={formData} setFormData={setFormData} />
    </BaseModal>
  );
}
