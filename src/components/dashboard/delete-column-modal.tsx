import BaseModal from '../ui/base-modal';

interface DeleteColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  columnTitle: string;
}

export default function DeleteColumnModal({
  isOpen,
  onClose,
  onConfirm,
  columnTitle,
}: DeleteColumnModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      title=''
      submitText='삭제'
      cancelText='취소'
      width='w-[32rem]'
      onClose={onClose}
      onSubmit={handleConfirm}
      onCancel={onClose}
    >
      <div className='py-4 text-center'>
        <p className='text-lg font-medium text-gray-900'>
          컬럼의 모든 카드가 삭제됩니다.
        </p>
      </div>
    </BaseModal>
  );
}
