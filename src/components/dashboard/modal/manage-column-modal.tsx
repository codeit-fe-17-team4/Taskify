import { useRef, useState } from 'react';
import DeleteColumnModal from '@/components/dashboard/modal/delete-column-modal';
import ManageColumnForm from '@/components/dashboard/modal/manage-column-form';
import type {
  ColumnType,
  ManageColumnFormData,
} from '@/components/dashboard/type';
import ButtonModal from '@/components/ui/modal/modal-button';
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
  const prevIsOpenRef = useRef(false);

  // 모달이 열릴 때마다 formData 초기화
  if (isOpen && !prevIsOpenRef.current && column) {
    setFormData({
      name: column.title || '',
    });
  }
  prevIsOpenRef.current = isOpen;

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
    handleClose();
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

  // 변경사항이 있는지 확인
  const hasChanges = formData.name.trim() !== (column?.title || '');

  const isUpdateDisabled = !formData.name.trim() || isDuplicate || !hasChanges;

  if (!column) {
    return null;
  }

  return (
    <>
      <ButtonModal
        key={column.id}
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
      </ButtonModal>

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
