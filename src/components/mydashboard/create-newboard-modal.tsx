import { useRouter } from 'next/router';
import { type ReactNode, useState } from 'react';
import CreateNewboardForm from '@/components/mydashboard/create-newboard-form';
import type { CreateNewboardFormData } from '@/components/mydashboard/type';
import ButtonModal from '@/components/ui/modal/modal-button';
import { useModalKeyHandler } from '@/hooks/useModal';
import { createDashBoard } from '@/lib/dashboards/api';

interface CreateNewboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  addDashboardToList: () => void;
}
export default function CreateNewboardModal({
  isOpen,
  onClose,
  addDashboardToList,
}: CreateNewboardModalProps): ReactNode {
  const [formData, setFormData] = useState<CreateNewboardFormData>({
    title: '',
    color: '#7AC555', // 기본 색상 설정
  });
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateDashboard = async () => {
    if (isCreating) {
      return;
    }
    try {
      setIsCreating(true);
      const newDashboard = await createDashBoard(formData);

      addDashboardToList();
      onClose();
      router.push(`/dashboard/${String(newDashboard.id)}`);
    } catch (error) {
      console.error('대시보드 생성 실패:', error);
      alert('대시보드 생성에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  useModalKeyHandler(isOpen, handleClose);

  const handleSubmit = () => {
    handleCreateDashboard();
  };

  const isSubmitDisabled = !formData.title.trim() || isCreating;

  return (
    <ButtonModal
      isOpen={isOpen}
      title='새로운 대시보드'
      submitText='생성'
      cancelText='취소'
      isSubmitDisabled={isSubmitDisabled}
      width='w-[32rem]'
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <CreateNewboardForm formData={formData} setFormData={setFormData} />
    </ButtonModal>
  );
}
