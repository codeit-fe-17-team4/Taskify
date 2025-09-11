import ButtonModal from '@/components/ui/modal/modal-button';
import { useTheme } from '@/contexts/ThemeContext';

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
  const { theme } = useTheme();
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <ButtonModal
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
        <p
          className={`text-lg font-medium ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          컬럼의 모든 카드가 삭제됩니다.
        </p>
      </div>
    </ButtonModal>
  );
}
