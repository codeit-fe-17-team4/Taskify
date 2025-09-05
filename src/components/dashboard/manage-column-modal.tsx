import { useEffect, useState } from 'react';
import DeleteColumnModal from '@/components/dashboard/delete-column-modal';
import ManageColumnForm from '@/components/dashboard/manage-column-form';
import type {
  ColumnType,
  ManageColumnFormData,
} from '@/components/dashboard/type';
import BaseModal from '@/components/ui/modal/modal-base';
import { useModalKeyHandler } from '@/hooks/useModal';

interface ManageColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  column: ColumnType | null;
  onUpdate: (columnId: string, columnData: ManageColumnFormData) => void;
  onDelete: (columnId: string) => void;
  existingColumns?: string[];
}

export default function ManageColumnModal({
  isOpen,
  onClose,
  column,
  onUpdate,
  onDelete,
  existingColumns = [],
}: ManageColumnModalProps) {
  const [formData, setFormData] = useState<ManageColumnFormData>({
    name: '',
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
    if (!column) {
      return;
    }
    onUpdate(column.id, formData);
    handleClose();
  };

  const handleDelete = () => {
    handleClose(); // 기존 모달 먼저 닫기
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!column) {
      return;
    }
    onDelete(column.id);
    handleClose();
  };

  // 중복 검사 (현재 컬럼 제외)
  const isDuplicate = existingColumns
    .filter((colName) => colName !== column?.title)
    .some((colName) => colName.toLowerCase() === formData.name.toLowerCase());

  const isUpdateDisabled = !formData.name.trim() || isDuplicate;

  if (!column) {
    return null;
  }

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        title='컬럼 관리'
        submitText='변경'
        cancelText='삭제'
        isSubmitDisabled={isUpdateDisabled}
        width='w-[32rem]'
        errorMessage={isDuplicate ? '중복된 컬럼 이름입니다.' : undefined}
        onClose={handleClose}
        onSubmit={handleUpdate}
        onCancel={handleDelete}
      >
        <ManageColumnForm
          formData={formData}
          setFormData={setFormData}
          hasError={isDuplicate}
        />
      </BaseModal>

      <DeleteColumnModal
        isOpen={isDeleteModalOpen}
        columnTitle={column.title}
        onConfirm={handleConfirmDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
        }}
      />
    </>
  );
}
