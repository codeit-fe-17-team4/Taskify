import { useState } from 'react';
import { useModalKeyHandler } from '@/hooks/useModal';
import BaseModal from '../ui/base-modal';
import CreateColumnForm from './create-column-form';
import type { CreateColumnFormData } from './type';

interface CreateColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (columnData: CreateColumnFormData) => void;
  existingColumns?: string[];
  maxColumns?: number;
}

export default function CreateColumnModal({
  isOpen,
  onClose,
  onSubmit,
  existingColumns = [],
  maxColumns = 10,
}: CreateColumnModalProps) {
  const [formData, setFormData] = useState<CreateColumnFormData>({
    name: '',
  });

  const handleClose = () => {
    setFormData({ name: '' });
    onClose();
  };

  useModalKeyHandler(isOpen, handleClose);

  const isDuplicate = existingColumns.some(
    (columnName) => columnName.toLowerCase() === formData.name.toLowerCase()
  );

  const isMaxColumnsReached = existingColumns.length >= maxColumns;

  const handleSubmit = () => {
    if (!isDuplicate && !isMaxColumnsReached) {
      onSubmit(formData);
      handleClose();
    }
  };

  const isSubmitDisabled =
    !formData.name.trim() || isDuplicate || isMaxColumnsReached;

  return (
    <BaseModal
      isOpen={isOpen}
      title='새 컬럼 생성'
      submitText='생성'
      cancelText='취소'
      isSubmitDisabled={isSubmitDisabled}
      width='w-[32rem]'
      errorMessage={
        isMaxColumnsReached
          ? `최대 ${maxColumns}개까지만 생성할 수 있습니다.`
          : isDuplicate
            ? '중복된 컬럼 이름입니다.'
            : undefined
      }
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <CreateColumnForm
        formData={formData}
        setFormData={setFormData}
        hasError={isDuplicate}
      />
    </BaseModal>
  );
}
