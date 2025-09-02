import { useEffect,useState } from 'react';
import { useModalKeyHandler } from '@/hooks/useModal';
import BaseModal from '../ui/base-modal';
import ManageColumnForm from './manage-column-form';
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

  useEffect(() => {
    if (column) {
      setFormData({ name: column.title });
    }
  }, [column]);

  const handleClose = () => {
    onClose();
  };

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

  const isUpdateDisabled = !formData.name.trim();

  if (!column) {return null;}

  return (
    <BaseModal
      isOpen={isOpen}
      title='컬럼 관리'
      submitText='변경'
      cancelText='삭제'
      isSubmitDisabled={isUpdateDisabled}
      width='w-[32rem]'
      onClose={handleClose}
      onSubmit={handleUpdate}
      onCancel={handleDelete}
    >
      <ManageColumnForm formData={formData} setFormData={setFormData} />
    </BaseModal>
  );
}
