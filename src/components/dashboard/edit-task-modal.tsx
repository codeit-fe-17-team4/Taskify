import { useEffect,useState } from 'react';
import { useModalKeyHandler } from '@/hooks/useModal';
import BaseModal from '../ui/base-modal';
import EditTaskForm from './edit-task-form';
import type { EditTaskFormData, TaskType } from './type';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: EditTaskFormData) => void;
  initialTask?: TaskType;
}

export default function EditTaskModal({
  isOpen,
  onClose,
  onSubmit,
  initialTask,
}: EditTaskModalProps) {
  const [formData, setFormData] = useState<EditTaskFormData>({
    status: 'To Do',
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
    if (!dateString) {return '';}

    // '2025-08-28 10:30' -> '2025-08-28T10:30' 포맷으로 변환
    return dateString.replace(' ', 'T');
  };

  // 초기 태스크 데이터로 폼 데이터 설정
  useEffect(() => {
    if (initialTask && isOpen) {
      setFormData({
        status: 'To Do', // 기본값, 실제로는 태스크의 컬럼 상태에 따라 설정
        assignee: initialTask.manager.name,
        title: initialTask.title,
        description: initialTask.description || '',
        dueDate: formatDateTimeLocal(initialTask.dueDate || ''),
        tags: initialTask.tags.map((tag) => tag.label),
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

  const isSubmitDisabled =
    !formData.title.trim() || !formData.description.trim();

  return (
    <BaseModal
      isOpen={isOpen}
      title='할 일 수정'
      submitText='수정'
      cancelText='취소'
      isSubmitDisabled={isSubmitDisabled}
      onClose={handleClose}
      onSubmit={handleSubmit}
    >
      <EditTaskForm formData={formData} setFormData={setFormData} />
    </BaseModal>
  );
}
