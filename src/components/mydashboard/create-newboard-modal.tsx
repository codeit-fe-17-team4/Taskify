import { useRouter } from 'next/router';
import { type ReactNode, useState } from 'react';
import CreateNewboardForm from '@/components/mydashboard/create-newboard-form';
import type { CreateNewboardFormData } from '@/components/mydashboard/type';
import ButtonModal from '@/components/ui/modal/modal-button';
import { useModalKeyHandler } from '@/hooks/useModal';

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
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();
  const handleCreateDashboard = async () => {
    if (isCreating) {
      return;
    }
    try {
      setIsCreating(true);

      // 공통 함수로 대시보드 추가 , 내가 생성한 거니까 isOwner: true;
      addDashboardToList();
      onClose();
      // id 가 number 타입인데 아래와 같이 사용하려니까 오류가 나서 해결 방법을 찾아보니 직접 타입을 명시해줘야 한다고 하여 toString으로 명시했습니다. 흠
      // 생성 시 페이지 이동
      // router.push(`/dashboard/${newDashboard.id.toString()}`); 일단 생략
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
    handleClose();
  };

  const isSubmitDisabled = !formData.title.trim();

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
