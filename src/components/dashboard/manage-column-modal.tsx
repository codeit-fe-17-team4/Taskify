import { useState, useEffect } from 'react';
import BaseModal from '../ui/base-modal';
import ManageColumnForm from './manage-column-form';
import { useModalKeyHandler } from '@/hooks/useModal';
import type { ColumnType, ManageColumnFormData } from './type';

interface ManageColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  column: ColumnType | null;
  onUpdate: (columnId: string, columnData: ManageColumnFormData) => void;
  onDelete: (columnId: string) => void;
}

export default function ManageColumnModal({
  isOpen,
  onClose,
  column,
  onUpdate,
  onDelete,
}: ManageColumnModalProps) {
  const [formData, setFormData] = useState<ManageColumnFormData>({
    name: '',
  });

  // 컬럼이 변경될 때마다 폼 데이터 업데이트
  useEffect(() => {
    if (column) {
      setFormData({ name: column.title });
    }
  }, [column]);

  useModalKeyHandler(isOpen, handleClose);

  const handleUpdate = () => {
    if (column) {
      onUpdate(column.id, formData);
      handleClose();
    }
  };

  const handleDelete = () => {
    if (column) {
      onDelete(column.id);
      handleClose();
    }
  };

  const handleClose = () => {
    // 폼 데이터는 초기화하지 않음 (기존 컬럼 이름을 유지)
    onClose();
  };

  const isUpdateDisabled = !formData.name.trim();

  if (!column) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title='컬럼 관리'
      onSubmit={handleUpdate}
      onCancel={handleDelete}
      submitText='변경'
      cancelText='삭제'
      isSubmitDisabled={isUpdateDisabled}
      width='w-[32rem]'
    >
      <ManageColumnForm formData={formData} setFormData={setFormData} />
    </BaseModal>
  );
}
