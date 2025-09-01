import { useState } from 'react';
import BaseModal from '../ui/base-modal';
import CreateTaskForm from './create-task-form';
import { useModalKeyHandler } from '@/hooks/useModal';
import type { CreateTaskFormData } from './type';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: CreateTaskFormData) => void;
}

export default function CreateTaskModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateTaskModalProps) {
  const [formData, setFormData] = useState<CreateTaskFormData>({
    assignee: '',
    title: '',
    description: '',
    dueDate: '',
    tags: [],
    imageFile: null,
  });

  const handleClose = () => {
    // 폼 데이터 초기화
    setFormData({
      assignee: '',
      title: '',
      description: '',
      dueDate: '',
      tags: [],
      imageFile: null,
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
      onClose={handleClose}
      title='할 일 생성'
      onSubmit={handleSubmit}
      submitText='생성'
      cancelText='취소'
      isSubmitDisabled={isSubmitDisabled}
    >
      <CreateTaskForm formData={formData} setFormData={setFormData} />
    </BaseModal>
  );
}
