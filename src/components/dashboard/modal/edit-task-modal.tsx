import { useEffect, useState } from 'react';
import EditTaskForm from '@/components/dashboard/modal/edit-task-form';
import type { EditTaskFormData, TaskType } from '@/components/dashboard/type';
import ButtonModal from '@/components/ui/modal/modal-button';
import { useModalKeyHandler } from '@/hooks/useModal';
import type { UserType } from '@/lib/users/type';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: EditTaskFormData) => void;
  initialTask?: TaskType;
  columns?: { id: string; title: string }[];
  currentColumnTitle?: string;
  userInfo: UserType | null;
  members?: any[];
}

export default function EditTaskModal({
  isOpen,
  onClose,
  onSubmit,
  initialTask,
  columns = [],
  currentColumnTitle,
  userInfo,
  members = [],
}: EditTaskModalProps) {
  const [formData, setFormData] = useState<EditTaskFormData>({
    status: currentColumnTitle || 'To Do',
    assignee: '',
    title: '',
    description: '',
    dueDate: '',
    tags: [],
    imageFile: null,
    existingImageUrl: undefined,
  });

  /**
   * 날짜 포맷 변환 함수.
   */
  const formatDateTimeLocal = (dateString: string) => {
    if (!dateString) {
      return '';
    }

    // '2025-08-28 10:30' -> '2025-08-28T10:30' 포맷으로 변환
    return dateString.replace(' ', 'T');
  };

  // 초기 태스크 데이터로 폼 데이터 설정
  useEffect(() => {
    if (initialTask && isOpen) {
      setFormData({
        status: currentColumnTitle || 'To Do', // 현재 컬럼명 사용
        assignee: initialTask.manager.name,
        title: initialTask.title,
        description: initialTask.description || '',
        dueDate: formatDateTimeLocal(initialTask.dueDate || ''),
        tags: initialTask.tags,
        imageFile: null,
        existingImageUrl: initialTask.imageUrl,
      });
    }
  }, [initialTask, isOpen]);

  const handleClose = () => {
    // 폼 데이터 초기화
    setFormData({
      status: 'To Do',
      assignee: '',
      title: '',
      description: '',
      dueDate: '',
      tags: [],
      imageFile: null,
      existingImageUrl: undefined,
    });
    onClose();
  };

  useModalKeyHandler(isOpen, handleClose);

  const handleSubmit = () => {
    onSubmit(formData);
    handleClose();
  };

  /**
   * 원본 데이터와 비교하여 변경사항이 있는지 확인
   */
  const hasChanges = () => {
    if (!initialTask) {
      return false;
    }

    // 이미지 삭제 감지: 원본에 이미지가 있었는데 현재는 없는 경우
    const imageDeleted =
      initialTask.imageUrl && !formData.existingImageUrl && !formData.imageFile;

    const changes = {
      title: formData.title !== initialTask.title,
      description: formData.description !== (initialTask.description || ''),
      assignee: formData.assignee !== initialTask.manager.name,
      dueDate:
        formData.dueDate !== formatDateTimeLocal(initialTask.dueDate || ''),
      status: formData.status !== currentColumnTitle,
      tags: JSON.stringify(formData.tags) !== JSON.stringify(initialTask.tags),
      newImage: formData.imageFile !== null,
      imageDeleted: imageDeleted,
    };

    console.log('변경사항 확인:', {
      initialImageUrl: initialTask.imageUrl,
      currentExistingImageUrl: formData.existingImageUrl,
      currentImageFile: formData.imageFile,
      imageDeleted,
      changes,
    });

    return Object.values(changes).some(Boolean);
  };

  const isSubmitDisabled =
    !formData.title.trim() || !formData.description.trim() || !hasChanges();

  return (
    <ButtonModal
      isOpen={isOpen}
      title='할 일 수정'
      submitText='수정'
      cancelText='취소'
      isSubmitDisabled={isSubmitDisabled}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <EditTaskForm
        formData={formData}
        setFormData={setFormData}
        columns={columns}
        userInfo={userInfo}
        members={members}
      />
    </ButtonModal>
  );
}
