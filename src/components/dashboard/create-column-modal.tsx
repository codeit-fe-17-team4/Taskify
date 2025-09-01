import { useState } from 'react';
import BaseModal from '../ui/base-modal';
import CreateColumnForm from './create-column-form';
import { useModalKeyHandler } from '@/hooks/useModal';
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
    // 폼 데이터 초기화
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
      onClose={handleClose}
      title='새 컬럼 생성'
      onSubmit={handleSubmit}
      submitText='생성'
      cancelText='취소'
      isSubmitDisabled={isSubmitDisabled}
      width='w-[32rem]'
    >
      <CreateColumnForm formData={formData} setFormData={setFormData} />
    </BaseModal>
  );
}
