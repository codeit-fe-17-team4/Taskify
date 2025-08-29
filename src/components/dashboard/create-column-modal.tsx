import { useState, useEffect } from 'react';
import BaseModal from '../ui/base-modal';
import CreateColumnForm, { ColumnFormData } from './create-column-form';

interface CreateColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (columnData: ColumnFormData) => void;
}

export default function CreateColumnModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateColumnModalProps) {
  const [formData, setFormData] = useState<ColumnFormData>({
    name: '',
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = () => {
    onSubmit(formData);
    handleClose();
  };

  const handleClose = () => {
    // 폼 데이터 초기화
    setFormData({ name: '' });
    onClose();
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
